import numpy as np,cv2,pickle
im=cv2.imread('specimen.jpg',cv2.IMREAD_GRAYSCALE)
S=4
bands=[(17,113),(120,218),(231,330),(336,434),(441,537),(547,643),(650,747),(761,845),(846,922),(929,1012)]
EXP=[list('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),list('abcdefghijklmnopqrstuvwxyz'),list('0123456789'),
 list('!?.,:;…·+-*/\\=_—()[]{}<>'),
 ['"','"','`','´','^','~','@','#','$','%','&','!!','¿!','¡','§','¶','©','®','™','°','•','∴','✱'],
 list('¢£¥€฿₩₽₹₺₴đƒ+−×÷=≠≈±>≥<≤'),
 list('∞ΣΠ√∫‰!?@&§†‡*#↑↓←→↗↘↙↖~'),
 list('ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØŒÙÚÛÜÝŸ'),
 list('àáâãäåæçèéêëìíîïñòóôõöøœùúûüýÿ'),
 list('ßþðłđħıœæüi¿«»“”‘’„‚-—|#@')]
out=[]
for bi,(a,b) in enumerate(bands):
  y0=a+19;crop=im[y0:b-2]
  big=cv2.resize(crop,None,fx=S,fy=S,interpolation=cv2.INTER_CUBIC)
  big=cv2.GaussianBlur(big,(5,5),0)
  m=(big<140).astype(np.uint8)
  m=cv2.morphologyEx(m,cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(7,7)))
  # fill thin holes (gloss streaks) but keep real counters
  inv=(1-m).astype(np.uint8);n,lab,st,_=cv2.connectedComponentsWithStats(inv,4)
  for i in range(1,n):
    x,y,w,h,ar=st[i]
    if x==0 or y==0 or x+w>=m.shape[1] or y+h>=m.shape[0]:continue
    pts=cv2.findNonZero((lab==i).astype(np.uint8));(_, (rw,rh),_)=cv2.minAreaRect(pts)
    if min(rw,rh)<13 or ar<260: m[lab==i]=1
  n,lab,st,_=cv2.connectedComponentsWithStats(m,8)
  comps=[(st[i][0],st[i][1],st[i][2],st[i][3],i) for i in range(1,n) if st[i][4]>60]
  comps.sort()
  groups=[]
  for c in comps:
    x,y,w,h,i=c
    if groups and x<=groups[-1]['x1']+6*S:
      gp=groups[-1];gp['ids'].append(i);gp['x1']=max(gp['x1'],x+w)
    else: groups.append({'x0':x,'x1':x+w,'ids':[i]})
  print(bi,len(groups),len(EXP[bi]))
  gl=[]
  for gp in groups:
    mask=np.isin(lab,gp['ids']).astype(np.uint8)
    ys,xs=np.nonzero(mask);gl.append({'mask':mask[ys.min():ys.max()+1,xs.min():xs.max()+1],'x':xs.min(),'y0':ys.min()+y0*S,'y1':ys.max()+y0*S})
  out.append(gl)
pickle.dump(out,open('glyphs.pkl','wb'))
