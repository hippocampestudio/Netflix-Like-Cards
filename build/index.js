(()=>{var e,t={227:()=>{document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("netflix-lightbox"),t=document.getElementById("lightbox-content"),l=document.querySelector(".close-lightbox");if(!e||!t||!l)return;function r(){e.classList.remove("active"),document.body.classList.remove("lightbox-open")}const n=document.querySelectorAll(".netflix-card");0!==n.length&&(n.forEach((l=>{l.addEventListener("click",(r=>{r.preventDefault();const n=l.getAttribute("href");n&&fetch(n).then((e=>e.text())).then((l=>{const r=(new DOMParser).parseFromString(l,"text/html"),n=r.querySelector("h1"),s=r.querySelector(".entry-content"),i=r.querySelector(".wp-post-image"),a=r.querySelector(".prestations");a&&(s.querySelectorAll(".prestations").forEach((e=>e.remove())),a.querySelectorAll("a").forEach((e=>{newNode=document.createElement("span"),newNode.classList.add("prestation"),newNode.innerHTML=e.text,e.replaceWith(newNode)})),s.appendChild(a));const o=n?n.innerHTML:__("Titre non disponible","netflix-like-cards"),c=s?s.innerHTML:__("Contenu non disponible","netflix-like-cards"),d=i?i.src:"";t.innerHTML=`\n                        <div class="lightbox-header" style="background-image: url('${d}');">\n                            <h1>${o}</h1>\n                        </div>\n                        <div class="lightbox-body">${c}</div>\n                    `,e.classList.add("active"),document.body.classList.add("lightbox-open")})).catch((e=>{console.error("Erreur lors du chargement du contenu pour la lightbox:",e)}))}))})),l.addEventListener("click",r),e.addEventListener("click",(t=>{t.target===e&&r()})),document.addEventListener("keydown",(t=>{"Escape"===t.key&&e.classList.contains("active")&&r()})))}))},607:(e,t,l)=>{"use strict";const r=window.wp.blocks,n=window.wp.blockEditor,s=window.wp.components,i=window.wp.i18n,a=window.wp.element,o=window.wp.data,c=window.wp.coreData,d=window.ReactJSXRuntime;(0,r.registerBlockType)("create-block/netflix-card",{title:"Netflix Like Card",icon:"format-image",parent:["create-block/netflix-like-cards"],attributes:{title:{type:"string",source:"html",selector:"h3"},description:{type:"string",source:"html",selector:"p"},imageUrl:{type:"string"},linkPostUrl:{type:"string",default:""}},edit:function({attributes:e,setAttributes:t}){const{title:l,description:r,imageUrl:a,linkPostUrl:u}=e,h=(0,n.useBlockProps)(),x=(0,o.useSelect)((e=>{const{getPostTypes:t,getEntityRecords:l}=e(c.store);return(t({per_page:-1})?.filter((({viewable:e,slug:t})=>e&&!["attachment","wp_block"].includes(t)))||[]).flatMap((e=>l("postType",e.slug,{per_page:-1,_fields:"id,title,type,link"})||[]))}),[]).map((e=>({value:e.link,label:`${e.title.rendered} (${e.type})`})));return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.InspectorControls,{children:(0,d.jsxs)(s.PanelBody,{title:(0,i.__)("Réglage de la carte","netflix-like-cards"),children:[(0,d.jsxs)("fieldset",{children:[(0,d.jsx)("h2",{className:"blocks-base-control__label",children:(0,i.__)("Titre","netflix-like-cards")}),(0,d.jsx)(n.RichText,{tagName:"h2",value:l,onChange:e=>t({title:e}),placeholder:(0,i.__)("Titre de la carte","netflix-like-cards")})]}),(0,d.jsxs)("fieldset",{children:[(0,d.jsx)("h2",{className:"blocks-base-control__label",children:(0,i.__)("Description","netflix-like-cards")}),(0,d.jsx)(n.RichText,{tagName:"p",value:r,onChange:e=>t({description:e}),placeholder:(0,i.__)("Description de la carte","netflix-like-cards")})]}),(0,d.jsxs)("fieldset",{children:[(0,d.jsx)("h2",{className:"blocks-base-control__label",children:(0,i.__)("Image","netflix-like-cards")}),(0,d.jsx)(n.MediaUpload,{onSelect:e=>t({imageUrl:e.url}),allowedTypes:["image"],value:a,render:({open:e})=>(0,d.jsx)(s.Button,{onClick:e,isLarge:!0,isPrimary:!0,children:a?(0,i.__)("Remplacer l'image","netflix-like-cards"):(0,i.__)("Choisir une image","netflix-like-cards")})})]}),(0,d.jsxs)("fieldset",{children:[(0,d.jsx)("h2",{className:"blocks-base-control__label",children:(0,i.__)("Lien","netflix-like-cards")}),(0,d.jsx)(s.ComboboxControl,{__nextHasNoMarginBottom:!0,value:u,onChange:e=>t({linkPostUrl:e}),options:x,onFilterValueChange:e=>x.filter((t=>t.label.toLowerCase().includes(e.toLowerCase())))})]})]})}),(0,d.jsx)("div",{...h,children:(0,d.jsxs)("div",{className:"netflix-card",children:[a&&(0,d.jsx)("img",{src:a,alt:l}),(0,d.jsxs)("div",{className:"netflix-card-content",children:[(0,d.jsx)("h3",{children:l}),(0,d.jsx)(n.RichText.Content,{tagName:"p",value:r})]})]})})]})},save:function({attributes:e}){const{title:t,description:l,imageUrl:r,linkPostUrl:s}=e,i=n.useBlockProps.save();return(0,d.jsx)("div",{...i,children:(0,d.jsxs)("a",{href:s,className:"netflix-card",children:[r&&(0,d.jsx)("img",{src:r,alt:t}),(0,d.jsxs)("div",{className:"netflix-card-content",children:[(0,d.jsx)("h3",{children:t}),(0,d.jsx)(n.RichText.Content,{tagName:"p",value:l})]})]})})}}),l(227),(0,r.registerBlockType)("create-block/netflix-like-cards",{title:"Netflix-Like Cards",icon:"format-gallery",category:"hippocampe-studio",attributes:{carouselTitle:{type:"string",default:""}},edit:function({attributes:e,setAttributes:t}){const l=(0,n.useBlockProps)(),r=(0,a.useRef)(null),{carouselTitle:o}=e;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.InspectorControls,{children:(0,d.jsx)(s.PanelBody,{title:(0,i.__)("Réglages du carousel","netflix-like-cards"),children:(0,d.jsx)(s.TextControl,{__nextHasNoMarginBottom:!0,label:(0,i.__)("Titre du carousel","netflix-like-cards"),value:o,onChange:e=>t({carouselTitle:e})})})}),(0,d.jsxs)("div",{...l,children:[o&&(0,d.jsx)("h2",{className:"netflix-like-carousel-title",children:o}),(0,d.jsx)("div",{className:"netflix-like-carousel",ref:r,children:(0,d.jsx)(n.InnerBlocks,{allowedBlocks:["create-block/netflix-card"],orientation:"horizontal",renderAppender:()=>(0,d.jsx)(n.InnerBlocks.ButtonBlockAppender,{})})})]})]})},save:function({attributes:e}){const t=n.useBlockProps.save(),{carouselTitle:l}=e;return(0,d.jsxs)("div",{...t,children:[l&&(0,d.jsx)("h2",{className:"netflix-like-carousel-title",children:l}),(0,d.jsx)("div",{className:"netflix-like-carousel",children:(0,d.jsx)(n.InnerBlocks.Content,{})}),(0,d.jsx)("button",{className:"carousel-arrow left dashicons dashicons-arrow-left-alt2"}),(0,d.jsx)("button",{className:"carousel-arrow right dashicons dashicons-arrow-right-alt2"})]})}})}},l={};function r(e){var n=l[e];if(void 0!==n)return n.exports;var s=l[e]={exports:{}};return t[e](s,s.exports,r),s.exports}r.m=t,e=[],r.O=(t,l,n,s)=>{if(!l){var i=1/0;for(d=0;d<e.length;d++){for(var[l,n,s]=e[d],a=!0,o=0;o<l.length;o++)(!1&s||i>=s)&&Object.keys(r.O).every((e=>r.O[e](l[o])))?l.splice(o--,1):(a=!1,s<i&&(i=s));if(a){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[l,n,s]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,216:0,350:0};r.O.j=t=>0===e[t];var t=(t,l)=>{var n,s,[i,a,o]=l,c=0;if(i.some((t=>0!==e[t]))){for(n in a)r.o(a,n)&&(r.m[n]=a[n]);if(o)var d=o(r)}for(t&&t(l);c<i.length;c++)s=i[c],r.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return r.O(d)},l=globalThis.webpackChunknetflix_like_cards=globalThis.webpackChunknetflix_like_cards||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var n=r.O(void 0,[350],(()=>r(607)));n=r.O(n)})();