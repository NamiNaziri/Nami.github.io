import{r as c}from"./react-7luxY-ph.js";import{m as y}from"./matchmediaquery-Bo10qaqu.js";import{h as f}from"./hyphenate-style-name-HOLnhz8K.js";import{s as x}from"./shallow-equal-BQUY1Bas.js";import{P as t}from"./prop-types-Nl1eov_5.js";const r=t.oneOfType([t.string,t.number]),m={all:t.bool,grid:t.bool,aural:t.bool,braille:t.bool,handheld:t.bool,print:t.bool,projection:t.bool,screen:t.bool,tty:t.bool,tv:t.bool,embossed:t.bool},h={orientation:t.oneOf(["portrait","landscape"]),scan:t.oneOf(["progressive","interlace"]),aspectRatio:t.string,deviceAspectRatio:t.string,height:r,deviceHeight:r,width:r,deviceWidth:r,color:t.bool,colorIndex:t.bool,monochrome:t.bool,resolution:r,type:Object.keys(m)},{type:$,...g}=h,p={minAspectRatio:t.string,maxAspectRatio:t.string,minDeviceAspectRatio:t.string,maxDeviceAspectRatio:t.string,minHeight:r,maxHeight:r,minDeviceHeight:r,maxDeviceHeight:r,minWidth:r,maxWidth:r,minDeviceWidth:r,maxDeviceWidth:r,minColor:t.number,maxColor:t.number,minColorIndex:t.number,maxColorIndex:t.number,minMonochrome:t.number,maxMonochrome:t.number,minResolution:r,maxResolution:r,...g},M={...m,...p};var v={all:M,types:m,matchers:h,features:p};const E=e=>`not ${e}`,D=(e,o)=>{const s=f(e);return typeof o=="number"&&(o=`${o}px`),o===!0?s:o===!1?E(s):`(${s}: ${o})`},R=e=>e.join(" and "),q=e=>{const o=[];return Object.keys(v.all).forEach(s=>{const n=e[s];n!=null&&o.push(D(s,n))}),R(o)},O=c.createContext(void 0),w=e=>e.query||q(e),l=e=>e?Object.keys(e).reduce((s,n)=>(s[f(n)]=e[n],s),{}):void 0,d=()=>{const e=c.useRef(!1);return c.useEffect(()=>{e.current=!0},[]),e.current},C=e=>{const o=c.useContext(O),s=()=>l(e)||l(o),[n,i]=c.useState(s);return c.useEffect(()=>{const a=s();x(n,a)||i(a)},[e,o]),n},S=e=>{const o=()=>w(e),[s,n]=c.useState(o);return c.useEffect(()=>{const i=o();s!==i&&n(i)},[e]),s},j=(e,o)=>{const s=()=>y(e,o||{},!!o),[n,i]=c.useState(s),a=d();return c.useEffect(()=>{if(a){const u=s();return i(u),()=>{u&&u.dispose()}}},[e,o]),n},k=e=>{const[o,s]=c.useState(e.matches);return c.useEffect(()=>{const n=i=>{s(i.matches)};return e.addListener(n),s(e.matches),()=>{e.removeListener(n)}},[e]),o},U=(e,o,s)=>{const n=C(o),i=S(e);if(!i)throw new Error("Invalid or missing MediaQuery!");const a=j(i,n),u=k(a),b=d();return c.useEffect(()=>{b&&s&&s(u)},[u]),c.useEffect(()=>()=>{a&&a.dispose()},[]),u};export{U as u};
