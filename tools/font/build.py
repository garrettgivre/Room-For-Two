import pickle,numpy as np,potrace
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.ttLib import TTFont
out=pickle.load(open('glyphs.pkl','rb'))
EXP=[list('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),list('abcdefghijklmnopqrstuvwxyz'),list('0123456789'),
 list('!?.,:;…·+-*/\\=_—()[]{}<>'),
 ["'",'"','`','´','^','~','@','#','$','%','&',None,'¿','¡','§','¶','©','®','™','°','•','∴','✱'],
 list('¢£¥€฿₩₽₹₺₴đƒ+−×÷=≠≈±>≥<≤'),
 list('∞ΣΠ√∫‰!?@&§†‡*#↑↓←→↗↘↙↖~'),
 list('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØŒÙÚÛÜÝŸ'),
 list('àáâãäåæçèéêëìíîïñòóôõöøœùúûüýÿ'),
 list('ßþðłđħıœæ')+[None,None]+list('¿«»“”‘’„‚-—|#@')]
BASE=['ABCDEFGHIKLMNOPRSTUVWXYZ','abcdehiklmnorstuvwxz','0123456789','!?.:…','#%&©®','£¥€₩₹','ΣΠ!?#','AEINOU'+'ÀÈÌÑÒÙ','àèìñòù','ßðłıœæ#']
BASE=[None,None,None,None,None,None,None,'ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜ','àáâãäåèéêëìíîïñòóôõöùúûü',None]
BL={0:'ABCDEFGHIKLMNOPRSTUVWXYZ',1:'abcdehiklmnorstuvwxz',2:'0123456789',3:'!?.:…',4:'#%&©®',5:'£¥€₩₹',6:'ΣΠ!?#',7:'ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜ',8:'àáâãäåèéêëìíîïñòóôõöùúûü',9:'ßðłıœæ#'}
caps=[g['y1']-g['y0'] for g,c in zip(out[0],EXP[0]) if c in 'ABCDEFGHIKLMNOPRSTUVWXYZ']
capH=float(np.median(caps));K=700/capH;print('capH px',capH,'K',K)
glyphs={};UPM=1000;LSB=32
SCALE={5:1.25,6:1.3,7:1.48,8:1.68,9:1.2}
import cv2,os
GROW=int(os.environ.get('GROW','6'))
def open_counters(m):
  inv=(~m).astype(np.uint8);n,lab,st,_=cv2.connectedComponentsWithStats(inv,4)
  H,W=m.shape;res=m.copy();k=cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(GROW*2+1,GROW*2+1))
  for i in range(1,n):
    x,y,w,h,ar=st[i]
    if x==0 or y==0 or x+w>=W or y+h>=H:continue
    hole=(lab==i).astype(np.uint8)
    res&=~cv2.dilate(hole,k).astype(bool)
  return res
def trace(g,base,Kb):
  m0=open_counters(g['mask'].astype(bool));m=np.pad(m0,2);bm=potrace.Bitmap(~m);path=bm.trace(turdsize=12,alphamax=1.0,opticurve=True,opttolerance=.25)
  H=m.shape[0];top=g['y0']
  X=lambda p:(p.x-2)*Kb+LSB;Y=lambda p:(base-(top+p.y-2))*Kb
  adv=round(m0.shape[1]*Kb+LSB*2);pen=T2CharStringPen(adv,None);
  for curve in path:
    s=curve.start_point;pen.moveTo((X(s),Y(s)))
    for seg in curve.segments:
      if seg.is_corner:pen.lineTo((X(seg.c),Y(seg.c)));pen.lineTo((X(seg.end_point),Y(seg.end_point)))
      else:pen.curveTo((X(seg.c1),Y(seg.c1)),(X(seg.c2),Y(seg.c2)),(X(seg.end_point),Y(seg.end_point)))
    pen.closePath()
  return pen,adv
for bi,row in enumerate(out):
  bs=[g['y1'] for g,c in zip(row,EXP[bi]) if c and c in BL[bi]];base=float(np.median(bs))
  for g,c in zip(row,EXP[bi]):
    if not c or c in glyphs:continue
    pen,adv=trace(g,base,K*SCALE.get(bi,1));glyphs[c]=(pen,adv)
print(len(glyphs),'glyphs')
names={c:('uni%04X'%ord(c)) for c in glyphs}
order=['.notdef','space','nbspace']+[names[c] for c in glyphs]
cs={};adv={}
p=T2CharStringPen(500,None);p.moveTo((50,0));p.lineTo((450,0));p.lineTo((450,700));p.lineTo((50,700));p.closePath();cs['.notdef']=p.getCharString();adv['.notdef']=(500,50)
for n in ['space','nbspace']:
  p=T2CharStringPen(260,None);cs[n]=p.getCharString();adv[n]=(260,0)
for c,(pen,a) in glyphs.items():
  cs[names[c]]=pen.getCharString();adv[names[c]]=(a,LSB)
cmap={32:'space',160:'nbspace'};cmap.update({ord(c):names[c] for c in glyphs})
# convenience aliases
alias={'’':"'",'ʼ':"'"}
fb=FontBuilder(UPM,isTTF=False);fb.setupGlyphOrder(order);fb.setupCharacterMap(cmap)
fb.setupCFF('RoomForTwoBubble-Regular',{'FullName':'Room for Two Bubble'},cs,{})
fb.setupHorizontalMetrics(adv);fb.setupHorizontalHeader(ascent=950,descent=-280)
fb.setupNameTable({'familyName':'Room for Two Bubble','styleName':'Regular'})
fb.setupOS2(sTypoAscender=950,sTypoDescender=-280,sTypoLineGap=0,usWinAscent=1000,usWinDescent=320,sxHeight=520,sCapHeight=700)
fb.setupPost()
fb.font.flavor='woff2';fb.save('../../assets/r42-bubble.woff2')
f=TTFont('../../assets/r42-bubble.woff2');print('saved',len(f.getGlyphOrder()))
