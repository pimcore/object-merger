/*! For license information please see __federation_expose_default_export.be3e720a.js.LICENSE.txt */
(self["chunk_pimcore_objectmerger_bundle "]=self["chunk_pimcore_objectmerger_bundle "]||[]).push([["525"],{1020(e,t,i){"use strict";var l=i(8349),n=Symbol.for("react.element"),a=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,r=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function s(e,t,i){var l,a={},s=null,c=null;for(l in void 0!==i&&(s=""+i),void 0!==t.key&&(s=""+t.key),void 0!==t.ref&&(c=t.ref),t)o.call(t,l)&&!d.hasOwnProperty(l)&&(a[l]=t[l]);if(e&&e.defaultProps)for(l in t=e.defaultProps)void 0===a[l]&&(a[l]=t[l]);return{$$typeof:n,type:e,key:s,ref:c,props:a,_owner:r.current}}t.Fragment=a,t.jsx=s,t.jsxs=s},4848(e,t,i){"use strict";e.exports=i(1020)},6390(e,t,i){"use strict";i.r(t),i.d(t,{ObjectMergerPlugin:()=>R});var l=i(2977),n=i(2028),a=i(8972),o=i(4781),r=i(4848),d=i(8349),s=i(3304),c=i(8267),u=i(1161),p=i(3090);let m=(e,t)=>[e,t].filter(Boolean).join("/"),f=["block"],h=async e=>{let t,{objectId:i,layout:l,objectData:n,objectDataRegistry:a,layoutsList:o,setLayoutsList:r}=e,d={fullPath:(null==n?void 0:n.fullPath)??"",creationDate:(0,c.formatDateTime)({timestamp:(null==n?void 0:n.creationDate)??null,dateStyle:"short",timeStyle:"medium"}),modificationDate:(0,c.formatDateTime)({timestamp:(null==n?void 0:n.modificationDate)??null,dateStyle:"short",timeStyle:"medium"})},u=async e=>{let{data:t,objectValuesData:l=null==n?void 0:n.objectData,fieldBreadcrumbTitle:d="",fieldPath:p=""}=e,h=t.map(async e=>{if("layout"===e.datatype){let t=m(d,e.title);return await u({data:e.children,fieldBreadcrumbTitle:t,objectValuesData:l,fieldPath:p})}if("data"===e.datatype){let t=e.name,n=(0,s.get)(l,t),h=e.fieldtype,b=(0,c.isEmptyValue)(p)?t:`${p}.${t}`;if(!a.hasDynamicType(h))return[];let g=a.getDynamicType(h),v=await g.processVersionFieldData({objectId:i,item:e,fieldBreadcrumbTitle:d,fieldValueByName:n,fieldPath:b,layoutsList:o,setLayoutsList:r,versionId:i,versionCount:1}),j=null==v?void 0:v.map(async e=>{var t,i,n,a;if(l={},!(0,s.isEmpty)(null==e||null==(t=e.fieldData)?void 0:t.children)&&!f.includes(String((null==e||null==(i=e.fieldData)?void 0:i.fieldtype)??""))){let t=m(d,String((null==e||null==(n=e.fieldData)?void 0:n.title)??""));return await u({data:[null==e?void 0:e.fieldData],objectValuesData:{...l,[null==e||null==(a=e.fieldData)?void 0:a.name]:null==e?void 0:e.fieldValue},fieldBreadcrumbTitle:t,fieldPath:(null==e?void 0:e.fieldPath)??""})}return[e]});return(await Promise.all(j)).reduce((e,t)=>e.concat(t),[])}return[]});return(await Promise.all(h)).reduce((e,t)=>e.concat(t),[])},p=await u({data:l});return[...(t=[],Object.entries(d).forEach(e=>{let[i,l]=e;t.push({fieldBreadcrumbTitle:"systemData",fieldData:{title:i,name:i,fieldtype:"input"},fieldValue:l})}),t),...p]},b=e=>{var t,i;let l=e.fieldBreadcrumbTitle??"",n=(null==(t=e.fieldData)?void 0:t.name)??"",a=(null==(i=e.fieldData)?void 0:i.locale)??"default";return`${l}-${n}-${a}`},g=(0,d.createContext)(void 0),v=e=>{let{children:t,initialObjects:i}=e,[l,n]=(0,d.useState)({A:null==i?void 0:i.A,B:null==i?void 0:i.B}),a=(e=>{let{selectedMergerObjects:t,objectDataRegistry:i}=e,l=(0,o.useAppDispatch)(),[n,a]=(0,d.useState)(!1),[r,m]=(0,d.useState)(!1),[f,g]=(0,d.useState)({main:"A",target:"B"}),[v,j]=(0,d.useState)(new Set),[x,y]=(0,d.useState)([]),[S,B]=(0,d.useState)([]),[w,F]=(0,d.useState)([]),[D,T]=(0,d.useState)(!1),[$,P]=(0,d.useState)(!1),[_,A]=(0,d.useState)({A:!0,B:!0}),[C,E]=(0,d.useState)({A:null,B:null}),[I,k]=(0,d.useState)({A:null,B:null}),[O,M]=(0,d.useState)({A:null,B:null}),N=async()=>{if(!((0,s.isUndefined)(t.A)||(0,s.isUndefined)(t.B))){a(!0),y([]),B([]),j(new Set);try{var e,n,o,r,d,c,p,m;let[f,b,g,v]=await Promise.all([l(u.api.endpoints.dataObjectGetLayoutById.initiate({id:null==t||null==(e=t.A)?void 0:e.id},{forceRefetch:!0})).unwrap(),l(u.api.endpoints.dataObjectGetById.initiate({id:null==t||null==(n=t.A)?void 0:n.id},{forceRefetch:!0})).unwrap(),l(u.api.endpoints.dataObjectGetLayoutById.initiate({id:null==t||null==(o=t.B)?void 0:o.id},{forceRefetch:!0})).unwrap(),l(u.api.endpoints.dataObjectGetById.initiate({id:null==t||null==(r=t.B)?void 0:r.id},{forceRefetch:!0})).unwrap()]);if((null==b?void 0:b.className)!==(null==v?void 0:v.className)){T(!1),P(!1),a(!1);return}let j=await h({objectId:null==t||null==(d=t.A)?void 0:d.id,layout:(null==f?void 0:f.children)??[],objectData:b??{},objectDataRegistry:i,layoutsList:w,setLayoutsList:F}),x=await h({objectId:null==t||null==(c=t.B)?void 0:c.id,layout:(null==g?void 0:g.children)??[],objectData:v??{},objectDataRegistry:i,layoutsList:w,setLayoutsList:F});y(j),B(x),A({A:(null==b||null==(p=b.permissions)?void 0:p.save)!==!1,B:(null==v||null==(m=v.permissions)?void 0:m.save)!==!1});let S=(null==b?void 0:b.objectData)??{},D=(null==v?void 0:v.objectData)??{};E({A:S,B:D}),k({A:(0,s.cloneDeep)(S),B:(0,s.cloneDeep)(D)}),M({A:(0,s.cloneDeep)(S),B:(0,s.cloneDeep)(D)}),P(!0)}catch(e){console.error("Failed to load merger data",e)}finally{a(!1)}}},U=(0,d.useMemo)(()=>(0,s.isEmpty)(x)||(0,s.isEmpty)(S)?[]:((e,t,i,l,n)=>{let a=[],o=new Map(e.map(e=>[b(e),e])),r=new Map(t.map(e=>[b(e),e]));for(let e of new Set([...o.keys(),...r.keys()])){var d,c;let t=o.get(e),u=r.get(e),p="A"===i.main?t:u,m="B"===i.target?u:t,f="B"===i.main?(0,s.get)(n.B,(null==u?void 0:u.fieldPath)??""):(0,s.get)(n.A,(null==t?void 0:t.fieldPath)??""),h="B"===i.target?(0,s.get)(n.B,(null==u?void 0:u.fieldPath)??""):(0,s.get)(n.A,(null==t?void 0:t.fieldPath)??""),b=(0,s.isUndefined)(f)?(null==p?void 0:p.fieldValue)??null:f,g=(0,s.isUndefined)(h)?(null==m?void 0:m.fieldValue)??null:h,v=(null==p?void 0:p.fieldPath)??(null==m?void 0:m.fieldPath)??(null==p||null==(d=p.fieldData)?void 0:d.name)??(null==m||null==(c=m.fieldData)?void 0:c.name),j={Field:{fieldBreadcrumbTitle:(null==p?void 0:p.fieldBreadcrumbTitle)??(null==m?void 0:m.fieldBreadcrumbTitle),...(null==p?void 0:p.fieldData)??(null==m?void 0:m.fieldData)},main:b,target:g,isTouched:l.has(v),isDifferent:!(0,s.isEqual)(b,g),fieldPath:(null==p?void 0:p.fieldPath)??(null==m?void 0:m.fieldPath)};if("fieldcollections"===j.Field.fieldtype){let e=(null==b?void 0:b.length)??0,i=(null==g?void 0:g.length)??0,l=i>e?u:t,n=e<i?t:u;j.fieldCollectionModifiedList=(0,s.differenceWith)((null==l?void 0:l.fieldValue)??[],(null==n?void 0:n.fieldValue)??[],(e,t)=>(null==e?void 0:e.type)===(null==t?void 0:t.type)&&(0,s.isEqual)(null==e?void 0:e.data,null==t?void 0:t.data)).map(e=>e.type)}a.push(j)}return a})(x,S,f,v,O),[x,S,f,v,O]),R=(0,d.useMemo)(()=>{let e=f.target;return!(0,s.isEqual)(O[e],I[e])},[O,I,f]),V=(0,d.useMemo)(()=>_[f.target],[_,f]),W=(0,d.useCallback)(e=>{let t=f.main,i=f.target,l=(0,s.get)(O[t],e),n=(0,s.isUndefined)(l)?null:l;M(t=>{let l=(0,s.cloneDeep)(t);return(0,s.setWith)(l[i],e,n,Object),l}),j(t=>new Set([...t,e]))},[f,O]),L=(0,d.useCallback)(()=>{let e="A"===f.main?x:S,t="B"===f.target?S:x,i=f.main,l=f.target,n=new Set,a=(0,s.cloneDeep)(O[l]);((null==e?void 0:e.length)>(null==t?void 0:t.length)?e:t).forEach(l=>{let o=e.find(e=>e.fieldPath===l.fieldPath),r=t.find(e=>e.fieldPath===l.fieldPath);if(!(0,s.isEqual)(null==o?void 0:o.fieldValue,null==r?void 0:r.fieldValue)){let e=(0,c.isEmptyValue)(null==l?void 0:l.fieldPath)?null==l?void 0:l.fieldData.name:null==l?void 0:l.fieldPath,t=(0,s.get)(O[i],e),o=(0,s.isUndefined)(t)?null:t;(0,s.setWith)(a,e,o,Object),n.add(e)}}),M(e=>({...e,[l]:a})),j(e=>new Set([...e,...n]))},[x,S,f,O]),z=(0,d.useCallback)(e=>{let t=f.target,i=(0,s.get)(C[t],e);M(l=>{let n=(0,s.cloneDeep)(l);return null!==n[t]&&(0,s.setWith)(n[t],e,i,Object),n}),j(t=>{let i=new Set(t);return i.delete(e),i})},[f,C]),H=(0,d.useCallback)(()=>{let e=f.target;M(t=>({...t,[e]:(0,s.cloneDeep)(C[e])})),j(new Set)},[f,C]),X=(0,d.useCallback)(async()=>{let e=f.target,n={},a=O[e],o=I[e];if(("A"===e?x:S).forEach(e=>{let t=(0,c.isEmptyValue)(e.fieldPath)?e.fieldData.name:e.fieldPath,l=(0,s.get)(a,t),r=(0,s.get)(o,t);if(!(0,s.isEqual)(l,r)){var d;let a=null==(d=e.fieldData)?void 0:d.fieldtype,o=i.hasDynamicType(a)?i.getDynamicType(a):null,r=(null==o?void 0:o.supportsBatchAppendModes)===!0?(0,p.addBatchAppendMode)(l,p.BatchAppendMode.Replace):l;(0,s.setWith)(n,t,r,Object)}}),!(0,s.isEmpty)(n)){m(!0);try{var r;await l(u.api.endpoints.dataObjectPatchById.initiate({body:{data:[{id:null==t||null==(r=t[e])?void 0:r.id,task:"save",editableData:n}]}})).unwrap()}catch(e){console.error("Failed to save object",e)}finally{k(t=>({...t,[e]:(0,s.cloneDeep)(O[e])})),m(!1)}}},[f,O,C,v,t,l]);return{loadLayoutData:N,refetch:()=>{N()},isFetching:n,isLoading:n,isSaving:r,mergerFields:U,roles:f,touchedFields:v,copyFieldToTarget:W,applyAll:L,resetField:z,resetAll:H,mirror:()=>{g(e=>({main:e.target,target:e.main})),M({A:(0,s.cloneDeep)(C.A),B:(0,s.cloneDeep)(C.B)}),j(new Set)},save:X,versions:O,initialVersions:C,isSameObjectType:D,setIsSameObjectType:T,canCompare:$,setCanCompare:P,hasUnsavedChanges:R,canSaveTarget:V}})({selectedMergerObjects:l,objectDataRegistry:(0,o.useInjection)(o.serviceIds["DynamicTypes/ObjectDataRegistry"])}),{setCanCompare:m,setIsSameObjectType:f}=a,v=!(0,s.isUndefined)(null==i?void 0:i.A)&&!(0,s.isUndefined)(null==i?void 0:i.B);(0,d.useEffect)(()=>{let e=!(0,s.isUndefined)(null==l?void 0:l.A)&&!(0,s.isUndefined)(null==l?void 0:l.B);f(!0),m(e)},[null==l?void 0:l.A,null==l?void 0:l.B]);let j=(0,d.useMemo)(()=>({...a,selectedMergerObjects:l,setSelectedMergerObjects:n,autoCompare:v}),[a,l,n,v]);return(0,r.jsx)(g.Provider,{value:j,children:t})},j=()=>{let e=(0,d.useContext)(g);if((0,s.isUndefined)(e))throw Error("useObjectMergerContext must be used within a ObjectMergerProvider");return e};var x=i(2696),y=i(3659);let S=(0,y.createStyles)(e=>{let{token:t,css:i}=e;return{formWrapper:i`
      min-width: 400px;
    `}}),B=()=>{var e,t;let{t:i}=(0,o.useTranslation)(),{styles:l}=S(),n=(0,o.useAppDispatch)(),a=(0,d.useRef)(!1),{selectedMergerObjects:c,setSelectedMergerObjects:p,loadLayoutData:m,isLoading:f,canCompare:h,isSameObjectType:b,autoCompare:g}=j(),v=!(0,s.isUndefined)(null==c?void 0:c.A)&&!(0,s.isUndefined)(null==c?void 0:c.B)&&!b;return(0,d.useEffect)(()=>{var e,t,i,l;!g||(0,s.isUndefined)(null==c||null==(e=c.A)?void 0:e.id)||(0,s.isUndefined)(null==c||null==(t=c.B)?void 0:t.id)||!(0,s.isNil)(null==c||null==(i=c.A)?void 0:i.fullPath)&&!(0,s.isNil)(null==c||null==(l=c.B)?void 0:l.fullPath)||(async()=>{let[e,t]=await Promise.all([n(u.api.endpoints.dataObjectGetById.initiate({id:c.A.id},{forceRefetch:!1})).unwrap(),n(u.api.endpoints.dataObjectGetById.initiate({id:c.B.id},{forceRefetch:!1})).unwrap()]);p({A:{...c.A,fullPath:(null==e?void 0:e.fullPath)??""},B:{...c.B,fullPath:(null==t?void 0:t.fullPath)??""}})})()},[g,null==c||null==(e=c.A)?void 0:e.id,null==c||null==(t=c.B)?void 0:t.id]),(0,d.useEffect)(()=>{g&&h&&!a.current&&(a.current=!0,m())},[g,h]),(0,r.jsx)(x.Content,{padded:!0,padding:{x:"small",y:"extra-small"},children:(0,r.jsxs)(x.Flex,{gap:"extra-small",vertical:!0,children:[(0,r.jsx)(x.Title,{children:i("compare_objects.title")}),(0,r.jsxs)(x.Flex,{align:"flex-end",gap:"extra-small",children:[(0,r.jsx)("div",{className:l.formWrapper,children:(0,r.jsxs)(x.FormKit,{children:[(0,r.jsx)(x.Form.Item,{name:"mainObject",children:(0,r.jsx)(x.ManyToOneRelationInput,{dataObjectsAllowed:!0,enableSearch:!0,onChange:e=>{p({A:e,B:null==c?void 0:c.B})},value:null==c?void 0:c.A})}),(0,r.jsx)(x.Form.Item,{name:"compareObject",children:(0,r.jsx)(x.ManyToOneRelationInput,{dataObjectsAllowed:!0,enableSearch:!0,onChange:e=>{p({A:null==c?void 0:c.A,B:e})},value:null==c?void 0:c.B})})]})}),(0,r.jsx)(x.Button,{disabled:!h,loading:f,onClick:()=>{m()},type:"primary",children:i("compare_objects.form.compare_btn")})]}),v&&(0,r.jsx)(x.Alert,{message:i("compare_objects.form.error.different_object_types"),type:"error"})]})})};var w=i(3842);let F=["reverseObjectRelation"];var D=i(6942),T=i.n(D),$=i(2703);let P=["main","target"],_=(0,y.createStyles)(e=>{let{token:t,css:i}=e;return{headerContainer:i`
      position: sticky;
      top: 0;
      width: 100%;
      z-index: 999999999;

      &::before {
        content: '';
        position: absolute;
        top: -15px;
        bottom: 0;
        width: 100%;
        height: 20px;
        background-color: #fff;
        z-index: -1;
      }
    `,headerItem:i`
      flex: 1 1 50%;
      padding: ${t.paddingXXS}px ${t.paddingXS}px;
      background-color: ${t.Table.headerBg};
      border: 0.5px solid ${t.Table.colorBorderSecondary};
      border-top-width: 0;
      box-shadow: 0 2px 4px 0 rgba(35, 11, 100, .2);

      &:first-child {
        border-right: 0;
      }

      &:last-child {
        border-left: 0;
      }

      &:only-child {
        flex: 1 1 100%;
        border-right: 0.5px;
        border-left: 0.5px;
      }
    `,content:i`
      position: relative;
      min-width: 220px;
    `,emptyState:i`
      margin-top: 40px;
      max-width: 200px;
      text-align: center;
    `,switchContainer:i`
      position: absolute;
      top: 10px;
      right: ${t.paddingXS}px;
      z-index: 1;
    `,sectionTitle:i`
      position: relative;
      display: block;
      padding: ${t.paddingSM}px ${t.paddingXS}px ${t.paddingXS}px ${t.paddingXS}px;
      font-size: 14px;
      font-weight: 900;
    `,subSectionTitle:i`
      margin-left: 5px;
        
        &::before {
          content: '';
          display: block;
          position: absolute;
          left: 2px;
          width: 2px;
          height: 22px;
          background-color: ${t.Colors.Neutral.Fill.colorFill};
        }
    `,subSectionText:i`
      font-weight: 400;
    `,sectionFields:i`
      padding: ${t.paddingXS}px;
      border: 1px solid ${t.colorBorderContainer};
      border-radius: ${t.borderRadius}px;
    `,sectionFieldsWithoutBorder:i`
      border-width: 0;
    `,fieldTitle:i`
      min-height: 24px;
    `,fieldTitleContent:i`
      min-height: 24px;
    `,sectionFieldItem:i`
      flex: 1 1 50%;
      min-width: 50%;
      width: 100%;
      padding: ${t.paddingXS}px;
      background-color: ${t.colorBgContainerDisabled};
      border-radius: ${t.borderRadius}px;

      &:only-child {
        flex: 1 1 100%;
      }
    `,sectionFieldItemHighlight:i`
      background-color: ${t.Colors.Brand.Warning.colorWarningBg} !important;
    `,objectSectionFieldItemWrapper:i`
      flex: 1 1 50%;
      min-width: 50%;
      max-width: 900px;
      width: 100%;
    `,objectSectionFieldItemContent:i`
      height: 100%;
    `,objectSectionFieldItem:i`
      justify-content: flex-start;
      width: 100% !important;
      max-width: 100% !important;
      border-radius: ${t.borderRadius}px !important;
      border-color: transparent !important;
      color: ${t.colorText} !important;
    `,objectSectionFieldItemHighlight:i`
      &.versionFieldItem {
        border-color: ${t.colorBorder} !important;
      }
    `,objectSectionEmptyState:i`
      justify-content: center !important;
      width: 100%;
      min-width: 100px;
      height: 100%;
      background-color: ${t.colorBgContainerDisabled};
      border: 1px solid transparent !important;
    `,objectSectionEmptyStateDisabled:i`
      background-color: ${t.colorBgContainerDisabled} !important;
    `,objectSectionEmptyStateHighlight:i`
      background-color: ${t.Colors.Brand.Warning.colorWarningBg} !important;
      border-color: ${t.colorBorder} !important;
    `}}),A=["systemData"],C=["block","fieldcollections"],E=e=>{let{breadcrumbsList:t,mergerData:i,isExpandedUnmodifiedFields:l}=e,{t:n}=(0,o.useTranslation)(),{styles:a}=_(),{selectedMergerObjects:d,roles:u,copyFieldToTarget:m,resetField:f}=j();return(0,r.jsx)(r.Fragment,{children:null==t?void 0:t.map((e,t)=>{let o="systemData"===e.key;return(0,r.jsxs)("div",{children:[(e=>{let{key:t,isCommonSection:i}=e,l=A.includes(t),o=(l?n(`version.category.title.${t}`):t).split("/"),[d,...s]=l?o:o.map(e=>n(e)),u=s.length>0?` | ${s.join(" | ")}`:"";return(0,c.isEmptyValue)(d)&&(0,c.isEmptyValue)(u)?null:(0,r.jsxs)(x.Text,{className:T()(a.sectionTitle,{[a.subSectionTitle]:!i}),strong:!0,children:[d,!(0,c.isEmptyValue)(u)&&(0,r.jsx)("span",{className:a.subSectionText,children:u})]})})({key:e.key,isCommonSection:o}),(0,r.jsx)(x.Flex,{className:T()(a.sectionFields,{[a.sectionFieldsWithoutBorder]:!o}),gap:"extra-small",vertical:!0,children:i.map((t,i)=>{let h=e.key===t.Field.fieldBreadcrumbTitle,b=e.fieldKeys.includes(t.Field.name);return h&&b&&(0,r.jsx)($.AutoHideEmptyContent,{contentSelector:`.${a.objectSectionFieldItemContent}`,children:(0,r.jsx)("div",{children:(0,r.jsx)(x.Flex,{gap:"mini",children:P.map((e,i)=>{var h;let b=null==t?void 0:t.isDifferent,g=0===i,v=1===i,j=0===i?u.main:u.target,y=null==d||null==(h=d[j])?void 0:h.id,S=C.includes(t.Field.fieldtype),B=(b||t.isTouched)&&S&&(0,c.isEmptyValue)(t[e]);return(0,r.jsxs)(x.Flex,{className:a.objectSectionFieldItemWrapper,gap:"mini",vertical:!0,children:[(0,r.jsx)("div",{children:(e=>{let{fieldItem:t,isCommonSection:i,isMainVersion:l,isCompareVersion:o}=e,d=t.Field.title,u=t.Field.locale;if((0,c.isEmptyValue)(d))return(0,r.jsx)(r.Fragment,{});let p=i?n(`version.${d}`):n(d);return(0,r.jsx)("div",{className:a.fieldTitle,children:(0,r.jsxs)(x.Flex,{align:"center",className:a.fieldTitleContent,justify:"space-between",children:[l&&(0,r.jsxs)(x.Text,{children:[p," ",!(0,s.isEmpty)(u)&&(0,r.jsxs)(x.Text,{type:"secondary",children:["| ",u.toUpperCase()]})]}),!i&&l&&t.isDifferent&&(0,r.jsx)(x.IconButton,{icon:{value:"arrow-square-right"},onClick:()=>{m((null==t?void 0:t.fieldPath)??"")},size:"small"}),!i&&l&&!t.isDifferent&&!t.isTouched&&(0,r.jsx)(x.IconButton,{disabled:!0,icon:{value:"lock"},size:"small"}),!i&&o&&t.isTouched&&(0,r.jsx)(x.IconButton,{danger:!0,icon:{value:"corner-up-left"},onClick:()=>{f((null==t?void 0:t.fieldPath)??"")},size:"small"})]})})})({fieldItem:t,isCommonSection:o,isMainVersion:g,isCompareVersion:v})}),(0,r.jsxs)("div",{className:a.objectSectionFieldItemContent,children:[B&&(0,r.jsx)(x.Flex,{align:"center",className:T()(a.objectSectionFieldItem,a.objectSectionEmptyState,{[a.objectSectionEmptyStateDisabled]:g,[a.objectSectionEmptyStateHighlight]:v&&b}),justify:"center",children:n("compare_objects.empty")}),(0,r.jsx)(p.DataObjectProvider,{id:y,children:(0,r.jsx)(w.FieldCollectionProvider,{id:y,children:(0,r.jsx)(p.DataComponent,{className:T()(a.objectSectionFieldItem,"versionFieldItem",{[a.objectSectionFieldItemHighlight]:b&&v&&!o,versionFieldItemHighlight:b&&v&&!o}),datatype:"data",fieldCollectionModifiedList:null==t?void 0:t.fieldCollectionModifiedList,fieldType:t.Field.fieldtype,isExpandedUnmodifiedFields:l,...t.Field,name:t.Field.name,value:t[e]},`${t.fieldPath}-${t.isTouched}-${e}`)},`${y}-${t.fieldPath}-${t.isTouched}-${e}`)},`${y}-${t.fieldPath}-${t.isTouched}-${e}`)]})]},`${i}-${e}`)})})})},`${i}-${t.Field.name}`)})})]},`${t}-${e.key}`)})})},I=()=>{let e,{t}=(0,o.useTranslation)(),{styles:i}=_(),{selectedMergerObjects:l,canCompare:n,mergerFields:a,isLoading:c,roles:u}=j(),{openElement:p}=(0,w.useElementHelper)(),[m,f]=(0,d.useState)(!1),h=(0,d.useMemo)(()=>a.filter(e=>!(0,s.isEqual)((null==e?void 0:e.main)??null,(null==e?void 0:e.target)??null)||e.isTouched),[a]),b=(0,d.useMemo)(()=>m?a:h,[m,a,h]),g=(0,d.useMemo)(()=>{let e;return e={},a.forEach(t=>{let i=t.Field.fieldBreadcrumbTitle??"systemData";F.includes(t.Field.fieldtype)||((0,s.isUndefined)(e[i])&&(e[i]=new Set),e[i].add(t.Field.name))}),Object.entries(e).map(e=>{let[t,i]=e;return{key:t,fieldKeys:Array.from(i)}})},[a]),v=(0,d.useMemo)(()=>(e=>{let{data:t,breadcrumbsList:i}=e,l=(0,s.map)(t,"Field.name"),n=(0,s.map)(t,"Field.fieldBreadcrumbTitle");return(0,s.isEmpty)(i)?[]:(0,s.filter)((0,s.map)(i,e=>({...e,fieldKeys:(0,s.intersection)(e.fieldKeys,l)})),e=>!(0,s.isEmpty)(e.fieldKeys)&&n.includes(e.key))})({data:b,breadcrumbsList:g}),[b,g]),y=(0,d.useMemo)(()=>(0,s.isEmpty)(h)?[]:h.map(e=>e.Field.title),[h]),S=!(0,s.isUndefined)(y)&&y.length>0;return(0,r.jsxs)(x.Content,{centered:!n,loading:c,padded:!0,padding:{x:"small",y:"extra-small"},children:[!n&&(0,r.jsx)(x.Text,{type:"secondary",children:t("compare_objects.initial_description")}),n&&!(0,s.isEmpty)(b)&&(0,r.jsxs)(x.Flex,{vertical:!0,children:[(0,r.jsx)(x.Flex,{className:i.headerContainer,wrap:"wrap",children:(e=[u.main,u.target],(0,r.jsx)(r.Fragment,{children:e.map(e=>{let t=l[e];return(0,r.jsxs)(x.Flex,{align:"center",className:i.headerItem,justify:"space-between",children:[(0,r.jsxs)(x.Text,{strong:!0,children:[null==t?void 0:t.fullPath," (id:",null==t?void 0:t.id,")"]}),(0,r.jsx)(x.IconButton,{icon:{value:"open-folder"},onClick:()=>{p({id:Number(null==t?void 0:t.id),type:"data-object"})},type:"link"})]},`${e}-${null==t?void 0:t.id}`)})}))}),(0,r.jsxs)(x.Flex,{className:i.content,vertical:!0,children:[(0,r.jsx)("div",{className:i.switchContainer,children:(0,r.jsx)(x.Switch,{labelLeft:(0,r.jsx)(x.Text,{children:t("compare_objects.expand_unmodified_fields")}),onChange:()=>{f(!m)},value:m})}),!S&&!m&&(0,r.jsx)(x.Flex,{justify:"center",children:(0,r.jsx)(x.Text,{className:i.emptyState,children:t("compare_objects.no_difference")})}),(0,r.jsx)(E,{breadcrumbsList:v,isExpandedUnmodifiedFields:m,mergerData:b})]})]})]})},k=e=>{let{isFetching:t,refetch:i}=e;return t?(0,r.jsx)(x.Box,{padding:{x:"extra-small",y:"extra-small"},children:(0,r.jsx)(x.Spin,{})}):(0,r.jsx)(x.IconButton,{icon:{value:"refresh"},onClick:async()=>{i()}})},O=()=>{let{t:e}=(0,o.useTranslation)(),{canCompare:t,mergerFields:i,refetch:l,isFetching:n,touchedFields:a,mirror:d,applyAll:c,resetAll:u,save:p,isSaving:m,hasUnsavedChanges:f,canSaveTarget:h}=j();return!t||(0,s.isEmpty)(i)?(0,r.jsx)(r.Fragment,{}):(0,r.jsxs)(x.Toolbar,{justify:"space-between",children:[(0,r.jsxs)(x.Split,{size:"extra-small",children:[(0,r.jsx)(k,{isFetching:n,refetch:l}),(0,r.jsxs)(x.Flex,{gap:"extra-small",children:[(0,r.jsx)(x.IconTextButton,{icon:{value:"contrast-01"},onClick:d,children:e("compare_objects.toolbar.mirror_view")}),(0,r.jsx)(x.Tooltip,{title:e("compare_objects.toolbar.apply_all.description"),children:(0,r.jsx)(x.IconTextButton,{icon:{value:"corner-up-left"},onClick:c,children:e("compare_objects.toolbar.apply_all")})})]})]}),(0,r.jsxs)(x.Flex,{gap:"extra-small",children:[(0,r.jsx)(x.IconTextButton,{disabled:(0,s.isEmpty)(a),icon:{value:"corner-up-left"},onClick:u,children:e("compare_objects.toolbar.reset")}),(0,r.jsx)(x.Tooltip,{title:h?"":e("compare_objects.toolbar.save.no_permission"),children:(0,r.jsx)(x.Button,{disabled:!f||!h,loading:m,onClick:p,type:"primary",children:e("compare_objects.toolbar.save")})})]})]})},M=()=>(0,r.jsx)(x.ContentLayout,{renderToolbar:(0,r.jsx)(O,{}),renderTopBar:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(B,{}),(0,r.jsx)(x.Divider,{size:"none",theme:"secondary"})]}),children:(0,r.jsx)(I,{})}),N=e=>{let{initialObjectA:t,initialObjectB:i}=e,l=(0,s.isUndefined)(t)||(0,s.isUndefined)(i)?void 0:{A:t,B:i};return(0,r.jsx)(v,{initialObjects:l,children:(0,r.jsx)(M,{})})},U={onInit:()=>{l.container.get(o.serviceIds.mainNavRegistry).registerMainNavItem({path:"DataManagement/Compare Objects",label:"compare_objects.nav.compare_objects",order:500,permission:a.UserPermission.Objects,widgetConfig:{name:"ObjectMergerPage",id:"object-merger-page",component:"object-merger-page",config:{translationKey:"compare_objects.nav.compare_objects",icon:{type:"name",value:"compare"}}}}),l.container.get(o.serviceIds.widgetManager).registerWidget({name:"object-merger-page",component:N}),window.PimcoreStudioObjectMerger={mergeObjects:(e,t)=>{o.store.dispatch((0,n.openMainWidget)({name:"ObjectMergerPage",id:`object-merger-page-${e}-${t}`,component:"object-merger-page",config:{translationKey:"compare_objects.nav.compare_objects",icon:{type:"name",value:"compare"},initialObjectA:{type:"object",id:e},initialObjectB:{type:"object",id:t}}}))}}}};void 0!==(e=i.hmd(e)).hot&&e.hot.accept();let R={name:"object-merger-plugin",onInit:e=>{let{container:t}=e},onStartup:e=>{let{moduleSystem:t}=e;t.registerModule(U),console.log("Hello from object merger bundle.")}}},6942(e){!function(){"use strict";var t={}.hasOwnProperty;function i(){for(var e="",n=0;n<arguments.length;n++){var a=arguments[n];a&&(e=l(e,function(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return i.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var n="";for(var a in e)t.call(e,a)&&e[a]&&(n=l(n,a));return n}(a)))}return e}function l(e,t){return t?e?e+" "+t:e+t:e}e.exports?(i.default=i,e.exports=i):"function"==typeof define&&"object"==typeof define.amd&&define.amd?define("classnames",[],function(){return i}):window.classNames=i}()}}]);