/*! For license information please see __federation_expose_default_export.a60e4d6a.js.LICENSE.txt */
(self["chunk_pimcore_objectmerger_bundle "]=self["chunk_pimcore_objectmerger_bundle "]||[]).push([["525"],{1020(e,t,i){"use strict";var l=i(6798),n=Symbol.for("react.element"),a=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,r=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function s(e,t,i){var l,a={},s=null,c=null;for(l in void 0!==i&&(s=""+i),void 0!==t.key&&(s=""+t.key),void 0!==t.ref&&(c=t.ref),t)o.call(t,l)&&!d.hasOwnProperty(l)&&(a[l]=t[l]);if(e&&e.defaultProps)for(l in t=e.defaultProps)void 0===a[l]&&(a[l]=t[l]);return{$$typeof:n,type:e,key:s,ref:c,props:a,_owner:r.current}}t.Fragment=a,t.jsx=s,t.jsxs=s},4848(e,t,i){"use strict";e.exports=i(1020)},6390(e,t,i){"use strict";i.r(t),i.d(t,{ObjectMergerPlugin:()=>R});var l=i(2977),n=i(2028),a=i(8972),o=i(4781),r=i(4848),d=i(6798),s=i(4471),c=i(8267),u=i(1161);let p=(e,t)=>[e,t].filter(Boolean).join("/"),m=["block"],f=async e=>{let t,{objectId:i,layout:l,objectData:n,objectDataRegistry:a,layoutsList:o,setLayoutsList:r}=e,d={fullPath:(null==n?void 0:n.fullPath)??"",creationDate:(0,c.formatDateTime)({timestamp:(null==n?void 0:n.creationDate)??null,dateStyle:"short",timeStyle:"medium"}),modificationDate:(0,c.formatDateTime)({timestamp:(null==n?void 0:n.modificationDate)??null,dateStyle:"short",timeStyle:"medium"})},u=async e=>{let{data:t,objectValuesData:l=null==n?void 0:n.objectData,fieldBreadcrumbTitle:d="",fieldPath:f=""}=e,h=t.map(async e=>{if("layout"===e.datatype){let t=p(d,e.title);return await u({data:e.children,fieldBreadcrumbTitle:t,objectValuesData:l,fieldPath:f})}if("data"===e.datatype){let t=e.name,n=(0,s.get)(l,t),h=e.fieldtype,b=(0,c.isEmptyValue)(f)?t:`${f}.${t}`;if(!a.hasDynamicType(h))return[];let g=a.getDynamicType(h),j=await g.processVersionFieldData({objectId:i,item:e,fieldBreadcrumbTitle:d,fieldValueByName:n,fieldPath:b,layoutsList:o,setLayoutsList:r,versionId:i,versionCount:1}),v=null==j?void 0:j.map(async e=>{var t,i,n,a;if(l={},!(0,s.isEmpty)(null==e||null==(t=e.fieldData)?void 0:t.children)&&!m.includes(String((null==e||null==(i=e.fieldData)?void 0:i.fieldtype)??""))){let t=p(d,String((null==e||null==(n=e.fieldData)?void 0:n.title)??""));return await u({data:[null==e?void 0:e.fieldData],objectValuesData:{...l,[null==e||null==(a=e.fieldData)?void 0:a.name]:null==e?void 0:e.fieldValue},fieldBreadcrumbTitle:t,fieldPath:(null==e?void 0:e.fieldPath)??""})}return[e]});return(await Promise.all(v)).reduce((e,t)=>e.concat(t),[])}return[]});return(await Promise.all(h)).reduce((e,t)=>e.concat(t),[])},f=await u({data:l});return[...(t=[],Object.entries(d).forEach(e=>{let[i,l]=e;t.push({fieldBreadcrumbTitle:"systemData",fieldData:{title:i,name:i,fieldtype:"input"},fieldValue:l})}),t),...f]},h=e=>{var t,i;let l=e.fieldBreadcrumbTitle??"",n=(null==(t=e.fieldData)?void 0:t.name)??"",a=(null==(i=e.fieldData)?void 0:i.locale)??"default";return`${l}-${n}-${a}`},b=(0,d.createContext)(void 0),g=e=>{let{children:t,initialObjects:i}=e,[l,n]=(0,d.useState)({A:null==i?void 0:i.A,B:null==i?void 0:i.B}),a=(e=>{let{selectedMergerObjects:t,objectDataRegistry:i}=e,l=(0,o.useAppDispatch)(),[n,a]=(0,d.useState)(!1),[r,p]=(0,d.useState)(!1),[m,b]=(0,d.useState)({main:"A",target:"B"}),[g,j]=(0,d.useState)(new Set),[v,x]=(0,d.useState)([]),[y,S]=(0,d.useState)([]),[B,w]=(0,d.useState)([]),[F,D]=(0,d.useState)(!1),[T,$]=(0,d.useState)(!1),[P,_]=(0,d.useState)({A:!0,B:!0}),[C,E]=(0,d.useState)({A:null,B:null}),[I,A]=(0,d.useState)({A:null,B:null}),[k,O]=(0,d.useState)({A:null,B:null}),M=async()=>{if(!((0,s.isUndefined)(t.A)||(0,s.isUndefined)(t.B))){a(!0),x([]),S([]),j(new Set);try{var e,n,o,r,d,c,p,m;let[h,b,g,j]=await Promise.all([l(u.api.endpoints.dataObjectGetLayoutById.initiate({id:null==t||null==(e=t.A)?void 0:e.id},{forceRefetch:!0})).unwrap(),l(u.api.endpoints.dataObjectGetById.initiate({id:null==t||null==(n=t.A)?void 0:n.id},{forceRefetch:!0})).unwrap(),l(u.api.endpoints.dataObjectGetLayoutById.initiate({id:null==t||null==(o=t.B)?void 0:o.id},{forceRefetch:!0})).unwrap(),l(u.api.endpoints.dataObjectGetById.initiate({id:null==t||null==(r=t.B)?void 0:r.id},{forceRefetch:!0})).unwrap()]);if((null==b?void 0:b.className)!==(null==j?void 0:j.className)){D(!1),$(!1),a(!1);return}let v=await f({objectId:null==t||null==(d=t.A)?void 0:d.id,layout:(null==h?void 0:h.children)??[],objectData:b??{},objectDataRegistry:i,layoutsList:B,setLayoutsList:w}),y=await f({objectId:null==t||null==(c=t.B)?void 0:c.id,layout:(null==g?void 0:g.children)??[],objectData:j??{},objectDataRegistry:i,layoutsList:B,setLayoutsList:w});x(v),S(y),_({A:(null==b||null==(p=b.permissions)?void 0:p.save)!==!1,B:(null==j||null==(m=j.permissions)?void 0:m.save)!==!1});let F=(null==b?void 0:b.objectData)??{},T=(null==j?void 0:j.objectData)??{};E({A:F,B:T}),A({A:(0,s.cloneDeep)(F),B:(0,s.cloneDeep)(T)}),O({A:(0,s.cloneDeep)(F),B:(0,s.cloneDeep)(T)}),$(!0)}catch(e){console.error("Failed to load merger data",e)}finally{a(!1)}}},N=(0,d.useMemo)(()=>(0,s.isEmpty)(v)||(0,s.isEmpty)(y)?[]:((e,t,i,l,n)=>{let a=[],o=new Map(e.map(e=>[h(e),e])),r=new Map(t.map(e=>[h(e),e]));for(let e of new Set([...o.keys(),...r.keys()])){var d,c;let t=o.get(e),u=r.get(e),p="A"===i.main?t:u,m="B"===i.target?u:t,f="B"===i.main?(0,s.get)(n.B,(null==u?void 0:u.fieldPath)??""):(0,s.get)(n.A,(null==t?void 0:t.fieldPath)??""),h="B"===i.target?(0,s.get)(n.B,(null==u?void 0:u.fieldPath)??""):(0,s.get)(n.A,(null==t?void 0:t.fieldPath)??""),b=(0,s.isUndefined)(f)?(null==p?void 0:p.fieldValue)??null:f,g=(0,s.isUndefined)(h)?(null==m?void 0:m.fieldValue)??null:h,j=(null==p?void 0:p.fieldPath)??(null==m?void 0:m.fieldPath)??(null==p||null==(d=p.fieldData)?void 0:d.name)??(null==m||null==(c=m.fieldData)?void 0:c.name),v={Field:{fieldBreadcrumbTitle:(null==p?void 0:p.fieldBreadcrumbTitle)??(null==m?void 0:m.fieldBreadcrumbTitle),...(null==p?void 0:p.fieldData)??(null==m?void 0:m.fieldData)},main:b,target:g,isTouched:l.has(j),isDifferent:!(0,s.isEqual)(b,g),fieldPath:(null==p?void 0:p.fieldPath)??(null==m?void 0:m.fieldPath)};if("fieldcollections"===v.Field.fieldtype){let e=(null==b?void 0:b.length)??0,i=(null==g?void 0:g.length)??0,l=i>e?u:t,n=e<i?t:u;v.fieldCollectionModifiedList=(0,s.differenceWith)((null==l?void 0:l.fieldValue)??[],(null==n?void 0:n.fieldValue)??[],(e,t)=>(null==e?void 0:e.type)===(null==t?void 0:t.type)&&(0,s.isEqual)(null==e?void 0:e.data,null==t?void 0:t.data)).map(e=>e.type)}a.push(v)}return a})(v,y,m,g,k),[v,y,m,g,k]),U=(0,d.useMemo)(()=>{let e=m.target;return!(0,s.isEqual)(k[e],I[e])},[k,I,m]),R=(0,d.useMemo)(()=>P[m.target],[P,m]),V=(0,d.useCallback)(e=>{let t=m.main,i=m.target,l=(0,s.get)(k[t],e),n=(0,s.isUndefined)(l)?null:l;O(t=>{let l=(0,s.cloneDeep)(t);return(0,s.setWith)(l[i],e,n,Object),l}),j(t=>new Set([...t,e]))},[m,k]),W=(0,d.useCallback)(()=>{let e="A"===m.main?v:y,t="B"===m.target?y:v,i=m.main,l=m.target,n=new Set,a=(0,s.cloneDeep)(k[l]);((null==e?void 0:e.length)>(null==t?void 0:t.length)?e:t).forEach(l=>{let o=e.find(e=>e.fieldPath===l.fieldPath),r=t.find(e=>e.fieldPath===l.fieldPath);if(!(0,s.isEqual)(null==o?void 0:o.fieldValue,null==r?void 0:r.fieldValue)){let e=(0,c.isEmptyValue)(null==l?void 0:l.fieldPath)?null==l?void 0:l.fieldData.name:null==l?void 0:l.fieldPath,t=(0,s.get)(k[i],e),o=(0,s.isUndefined)(t)?null:t;(0,s.setWith)(a,e,o,Object),n.add(e)}}),O(e=>({...e,[l]:a})),j(e=>new Set([...e,...n]))},[v,y,m,k]),L=(0,d.useCallback)(e=>{let t=m.target,i=(0,s.get)(C[t],e);O(l=>{let n=(0,s.cloneDeep)(l);return null!==n[t]&&(0,s.setWith)(n[t],e,i,Object),n}),j(t=>{let i=new Set(t);return i.delete(e),i})},[m,C]),z=(0,d.useCallback)(()=>{let e=m.target;O(t=>({...t,[e]:(0,s.cloneDeep)(C[e])})),j(new Set)},[m,C]),H=(0,d.useCallback)(async()=>{let e=m.target,i={},n=k[e],a=I[e];if(("A"===e?v:y).forEach(e=>{let t=(0,c.isEmptyValue)(e.fieldPath)?e.fieldData.name:e.fieldPath,l=(0,s.get)(n,t),o=(0,s.get)(a,t);(0,s.isEqual)(l,o)||(0,s.setWith)(i,t,l,Object)}),!(0,s.isEmpty)(i)){p(!0);try{var o;await l(u.api.endpoints.dataObjectPatchById.initiate({body:{data:[{id:null==t||null==(o=t[e])?void 0:o.id,task:"save",editableData:i}]}})).unwrap()}catch(e){console.error("Failed to save object",e)}finally{A(t=>({...t,[e]:(0,s.cloneDeep)(k[e])})),p(!1)}}},[m,k,C,g,t,l]);return{loadLayoutData:M,refetch:()=>{M()},isFetching:n,isLoading:n,isSaving:r,mergerFields:N,roles:m,touchedFields:g,copyFieldToTarget:V,applyAll:W,resetField:L,resetAll:z,mirror:()=>{b(e=>({main:e.target,target:e.main})),O({A:(0,s.cloneDeep)(C.A),B:(0,s.cloneDeep)(C.B)}),j(new Set)},save:H,versions:k,initialVersions:C,isSameObjectType:F,setIsSameObjectType:D,canCompare:T,setCanCompare:$,hasUnsavedChanges:U,canSaveTarget:R}})({selectedMergerObjects:l,objectDataRegistry:(0,o.useInjection)(o.serviceIds["DynamicTypes/ObjectDataRegistry"])}),{setCanCompare:p,setIsSameObjectType:m}=a,g=!(0,s.isUndefined)(null==i?void 0:i.A)&&!(0,s.isUndefined)(null==i?void 0:i.B);(0,d.useEffect)(()=>{let e=!(0,s.isUndefined)(null==l?void 0:l.A)&&!(0,s.isUndefined)(null==l?void 0:l.B);m(!0),p(e)},[null==l?void 0:l.A,null==l?void 0:l.B]);let j=(0,d.useMemo)(()=>({...a,selectedMergerObjects:l,setSelectedMergerObjects:n,autoCompare:g}),[a,l,n,g]);return(0,r.jsx)(b.Provider,{value:j,children:t})},j=()=>{let e=(0,d.useContext)(b);if((0,s.isUndefined)(e))throw Error("useObjectMergerContext must be used within a ObjectMergerProvider");return e};var v=i(2696),x=i(9432);let y=(0,x.createStyles)(e=>{let{token:t,css:i}=e;return{formWrapper:i`
      min-width: 400px;
    `}}),S=()=>{var e,t;let{t:i}=(0,o.useTranslation)(),{styles:l}=y(),n=(0,o.useAppDispatch)(),a=(0,d.useRef)(!1),{selectedMergerObjects:c,setSelectedMergerObjects:p,loadLayoutData:m,isLoading:f,canCompare:h,isSameObjectType:b,autoCompare:g}=j(),x=!(0,s.isUndefined)(null==c?void 0:c.A)&&!(0,s.isUndefined)(null==c?void 0:c.B)&&!b;return(0,d.useEffect)(()=>{var e,t,i,l;!g||(0,s.isUndefined)(null==c||null==(e=c.A)?void 0:e.id)||(0,s.isUndefined)(null==c||null==(t=c.B)?void 0:t.id)||!(0,s.isNil)(null==c||null==(i=c.A)?void 0:i.fullPath)&&!(0,s.isNil)(null==c||null==(l=c.B)?void 0:l.fullPath)||(async()=>{let[e,t]=await Promise.all([n(u.api.endpoints.dataObjectGetById.initiate({id:c.A.id},{forceRefetch:!1})).unwrap(),n(u.api.endpoints.dataObjectGetById.initiate({id:c.B.id},{forceRefetch:!1})).unwrap()]);p({A:{...c.A,fullPath:(null==e?void 0:e.fullPath)??""},B:{...c.B,fullPath:(null==t?void 0:t.fullPath)??""}})})()},[g,null==c||null==(e=c.A)?void 0:e.id,null==c||null==(t=c.B)?void 0:t.id]),(0,d.useEffect)(()=>{g&&h&&!a.current&&(a.current=!0,m())},[g,h]),(0,r.jsx)(v.Content,{padded:!0,padding:{x:"small",y:"extra-small"},children:(0,r.jsxs)(v.Flex,{gap:"extra-small",vertical:!0,children:[(0,r.jsx)(v.Title,{children:i("compare_objects.title")}),(0,r.jsxs)(v.Flex,{align:"flex-end",gap:"extra-small",children:[(0,r.jsx)("div",{className:l.formWrapper,children:(0,r.jsxs)(v.FormKit,{children:[(0,r.jsx)(v.Form.Item,{name:"mainObject",children:(0,r.jsx)(v.ManyToOneRelationInput,{dataObjectsAllowed:!0,enableSearch:!0,onChange:e=>{p({A:e,B:null==c?void 0:c.B})},value:null==c?void 0:c.A})}),(0,r.jsx)(v.Form.Item,{name:"compareObject",children:(0,r.jsx)(v.ManyToOneRelationInput,{dataObjectsAllowed:!0,enableSearch:!0,onChange:e=>{p({A:null==c?void 0:c.A,B:e})},value:null==c?void 0:c.B})})]})}),(0,r.jsx)(v.Button,{disabled:!h,loading:f,onClick:()=>{m()},type:"primary",children:i("compare_objects.form.compare_btn")})]}),x&&(0,r.jsx)(v.Alert,{message:i("compare_objects.form.error.different_object_types"),type:"error"})]})})};var B=i(3842);let w=["reverseObjectRelation"];var F=i(6942),D=i.n(F),T=i(3090),$=i(2703);let P=["main","target"],_=(0,x.createStyles)(e=>{let{token:t,css:i}=e;return{headerContainer:i`
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
    `}}),C=["systemData"],E=["block","fieldcollections"],I=e=>{let{breadcrumbsList:t,mergerData:i,isExpandedUnmodifiedFields:l}=e,{t:n}=(0,o.useTranslation)(),{styles:a}=_(),{selectedMergerObjects:d,roles:u,copyFieldToTarget:p,resetField:m}=j();return(0,r.jsx)(r.Fragment,{children:null==t?void 0:t.map((e,t)=>{let o="systemData"===e.key;return(0,r.jsxs)("div",{children:[(e=>{let{key:t,isCommonSection:i}=e,l=C.includes(t),o=(l?n(`version.category.title.${t}`):t).split("/"),[d,...s]=l?o:o.map(e=>n(e)),u=s.length>0?` | ${s.join(" | ")}`:"";return(0,c.isEmptyValue)(d)&&(0,c.isEmptyValue)(u)?null:(0,r.jsxs)(v.Text,{className:D()(a.sectionTitle,{[a.subSectionTitle]:!i}),strong:!0,children:[d,!(0,c.isEmptyValue)(u)&&(0,r.jsx)("span",{className:a.subSectionText,children:u})]})})({key:e.key,isCommonSection:o}),(0,r.jsx)(v.Flex,{className:D()(a.sectionFields,{[a.sectionFieldsWithoutBorder]:!o}),gap:"extra-small",vertical:!0,children:i.map((t,i)=>{let f=e.key===t.Field.fieldBreadcrumbTitle,h=e.fieldKeys.includes(t.Field.name);return f&&h&&(0,r.jsx)($.AutoHideEmptyContent,{contentSelector:`.${a.objectSectionFieldItemContent}`,children:(0,r.jsx)("div",{children:(0,r.jsx)(v.Flex,{gap:"mini",children:P.map((e,i)=>{var f;let h=null==t?void 0:t.isDifferent,b=0===i,g=1===i,j=0===i?u.main:u.target,x=null==d||null==(f=d[j])?void 0:f.id,y=E.includes(t.Field.fieldtype),S=(h||t.isTouched)&&y&&(0,c.isEmptyValue)(t[e]);return(0,r.jsxs)(v.Flex,{className:a.objectSectionFieldItemWrapper,gap:"mini",vertical:!0,children:[(0,r.jsx)("div",{children:(e=>{let{fieldItem:t,isCommonSection:i,isMainVersion:l,isCompareVersion:o}=e,d=t.Field.title,u=t.Field.locale;if((0,c.isEmptyValue)(d))return(0,r.jsx)(r.Fragment,{});let f=i?n(`version.${d}`):n(d);return(0,r.jsx)("div",{className:a.fieldTitle,children:(0,r.jsxs)(v.Flex,{align:"center",className:a.fieldTitleContent,justify:"space-between",children:[l&&(0,r.jsxs)(v.Text,{children:[f," ",!(0,s.isEmpty)(u)&&(0,r.jsxs)(v.Text,{type:"secondary",children:["| ",u.toUpperCase()]})]}),!i&&l&&t.isDifferent&&(0,r.jsx)(v.IconButton,{icon:{value:"arrow-square-right"},onClick:()=>{p((null==t?void 0:t.fieldPath)??"")},size:"small"}),!i&&l&&!t.isDifferent&&!t.isTouched&&(0,r.jsx)(v.IconButton,{disabled:!0,icon:{value:"lock"},size:"small"}),!i&&o&&t.isTouched&&(0,r.jsx)(v.IconButton,{danger:!0,icon:{value:"corner-up-left"},onClick:()=>{m((null==t?void 0:t.fieldPath)??"")},size:"small"})]})})})({fieldItem:t,isCommonSection:o,isMainVersion:b,isCompareVersion:g})}),(0,r.jsxs)("div",{className:a.objectSectionFieldItemContent,children:[S&&(0,r.jsx)(v.Flex,{align:"center",className:D()(a.objectSectionFieldItem,a.objectSectionEmptyState,{[a.objectSectionEmptyStateDisabled]:b,[a.objectSectionEmptyStateHighlight]:g&&h}),justify:"center",children:n("compare_objects.empty")}),(0,r.jsx)(T.DataObjectProvider,{id:x,children:(0,r.jsx)(B.FieldCollectionProvider,{id:x,children:(0,r.jsx)(T.DataComponent,{className:D()(a.objectSectionFieldItem,"versionFieldItem",{[a.objectSectionFieldItemHighlight]:h&&g&&!o,versionFieldItemHighlight:h&&g&&!o}),datatype:"data",fieldCollectionModifiedList:null==t?void 0:t.fieldCollectionModifiedList,fieldType:t.Field.fieldtype,isExpandedUnmodifiedFields:l,...t.Field,name:t.Field.name,value:t[e]},`${t.fieldPath}-${t.isTouched}-${e}`)},`${x}-${t.fieldPath}-${t.isTouched}-${e}`)},`${x}-${t.fieldPath}-${t.isTouched}-${e}`)]})]},`${i}-${e}`)})})})},`${i}-${t.Field.name}`)})})]},`${t}-${e.key}`)})})},A=()=>{let e,{t}=(0,o.useTranslation)(),{styles:i}=_(),{selectedMergerObjects:l,canCompare:n,mergerFields:a,isLoading:c,roles:u}=j(),{openElement:p}=(0,B.useElementHelper)(),[m,f]=(0,d.useState)(!1),h=(0,d.useMemo)(()=>a.filter(e=>!(0,s.isEqual)((null==e?void 0:e.main)??null,(null==e?void 0:e.target)??null)||e.isTouched),[a]),b=(0,d.useMemo)(()=>m?a:h,[m,a,h]),g=(0,d.useMemo)(()=>{let e;return e={},a.forEach(t=>{let i=t.Field.fieldBreadcrumbTitle??"systemData";w.includes(t.Field.fieldtype)||((0,s.isUndefined)(e[i])&&(e[i]=new Set),e[i].add(t.Field.name))}),Object.entries(e).map(e=>{let[t,i]=e;return{key:t,fieldKeys:Array.from(i)}})},[a]),x=(0,d.useMemo)(()=>(e=>{let{data:t,breadcrumbsList:i}=e,l=(0,s.map)(t,"Field.name"),n=(0,s.map)(t,"Field.fieldBreadcrumbTitle");return(0,s.isEmpty)(i)?[]:(0,s.filter)((0,s.map)(i,e=>({...e,fieldKeys:(0,s.intersection)(e.fieldKeys,l)})),e=>!(0,s.isEmpty)(e.fieldKeys)&&n.includes(e.key))})({data:b,breadcrumbsList:g}),[b,g]),y=(0,d.useMemo)(()=>(0,s.isEmpty)(h)?[]:h.map(e=>e.Field.title),[h]),S=!(0,s.isUndefined)(y)&&y.length>0;return(0,r.jsxs)(v.Content,{centered:!n,loading:c,padded:!0,padding:{x:"small",y:"extra-small"},children:[!n&&(0,r.jsx)(v.Text,{type:"secondary",children:t("compare_objects.initial_description")}),n&&!(0,s.isEmpty)(b)&&(0,r.jsxs)(v.Flex,{vertical:!0,children:[(0,r.jsx)(v.Flex,{className:i.headerContainer,wrap:"wrap",children:(e=[u.main,u.target],(0,r.jsx)(r.Fragment,{children:e.map(e=>{let t=l[e];return(0,r.jsxs)(v.Flex,{align:"center",className:i.headerItem,justify:"space-between",children:[(0,r.jsxs)(v.Text,{strong:!0,children:[null==t?void 0:t.fullPath," (id:",null==t?void 0:t.id,")"]}),(0,r.jsx)(v.IconButton,{icon:{value:"open-folder"},onClick:()=>{p({id:Number(null==t?void 0:t.id),type:"data-object"})},type:"link"})]},`${e}-${null==t?void 0:t.id}`)})}))}),(0,r.jsxs)(v.Flex,{className:i.content,vertical:!0,children:[(0,r.jsx)("div",{className:i.switchContainer,children:(0,r.jsx)(v.Switch,{labelLeft:(0,r.jsx)(v.Text,{children:t("compare_objects.expand_unmodified_fields")}),onChange:()=>{f(!m)},value:m})}),!S&&!m&&(0,r.jsx)(v.Flex,{justify:"center",children:(0,r.jsx)(v.Text,{className:i.emptyState,children:t("compare_objects.no_difference")})}),(0,r.jsx)(I,{breadcrumbsList:x,isExpandedUnmodifiedFields:m,mergerData:b})]})]})]})},k=e=>{let{isFetching:t,refetch:i}=e;return t?(0,r.jsx)(v.Box,{padding:{x:"extra-small",y:"extra-small"},children:(0,r.jsx)(v.Spin,{})}):(0,r.jsx)(v.IconButton,{icon:{value:"refresh"},onClick:async()=>{i()}})},O=()=>{let{t:e}=(0,o.useTranslation)(),{canCompare:t,mergerFields:i,refetch:l,isFetching:n,touchedFields:a,mirror:d,applyAll:c,resetAll:u,save:p,isSaving:m,hasUnsavedChanges:f,canSaveTarget:h}=j();return!t||(0,s.isEmpty)(i)?(0,r.jsx)(r.Fragment,{}):(0,r.jsxs)(v.Toolbar,{justify:"space-between",children:[(0,r.jsxs)(v.Split,{size:"extra-small",children:[(0,r.jsx)(k,{isFetching:n,refetch:l}),(0,r.jsxs)(v.Flex,{gap:"extra-small",children:[(0,r.jsx)(v.IconTextButton,{icon:{value:"contrast-01"},onClick:d,children:e("compare_objects.toolbar.mirror_view")}),(0,r.jsx)(v.Tooltip,{title:e("compare_objects.toolbar.apply_all.description"),children:(0,r.jsx)(v.IconTextButton,{icon:{value:"corner-up-left"},onClick:c,children:e("compare_objects.toolbar.apply_all")})})]})]}),(0,r.jsxs)(v.Flex,{gap:"extra-small",children:[(0,r.jsx)(v.IconTextButton,{disabled:(0,s.isEmpty)(a),icon:{value:"corner-up-left"},onClick:u,children:e("compare_objects.toolbar.reset")}),(0,r.jsx)(v.Tooltip,{title:h?"":e("compare_objects.toolbar.save.no_permission"),children:(0,r.jsx)(v.Button,{disabled:!f||!h,loading:m,onClick:p,type:"primary",children:e("compare_objects.toolbar.save")})})]})]})},M=()=>(0,r.jsx)(v.ContentLayout,{renderToolbar:(0,r.jsx)(O,{}),renderTopBar:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(S,{}),(0,r.jsx)(v.Divider,{size:"none",theme:"secondary"})]}),children:(0,r.jsx)(A,{})}),N=e=>{let{initialObjectA:t,initialObjectB:i}=e,l=(0,s.isUndefined)(t)||(0,s.isUndefined)(i)?void 0:{A:t,B:i};return(0,r.jsx)(g,{initialObjects:l,children:(0,r.jsx)(M,{})})},U={onInit:()=>{l.container.get(o.serviceIds.mainNavRegistry).registerMainNavItem({path:"DataManagement/Compare Objects",label:"compare_objects.nav.compare_objects",order:500,permission:a.UserPermission.Objects,widgetConfig:{name:"ObjectMergerPage",id:"object-merger-page",component:"object-merger-page",config:{translationKey:"compare_objects.nav.compare_objects",icon:{type:"name",value:"compare"}}}}),l.container.get(o.serviceIds.widgetManager).registerWidget({name:"object-merger-page",component:N}),window.PimcoreStudioObjectMerger={mergeObjects:(e,t)=>{o.store.dispatch((0,n.openMainWidget)({name:"ObjectMergerPage",id:`object-merger-page-${e}-${t}`,component:"object-merger-page",config:{translationKey:"compare_objects.nav.compare_objects",icon:{type:"name",value:"compare"},initialObjectA:{type:"object",id:e},initialObjectB:{type:"object",id:t}}}))}}}};void 0!==(e=i.hmd(e)).hot&&e.hot.accept();let R={name:"object-merger-plugin",onInit:e=>{let{container:t}=e},onStartup:e=>{let{moduleSystem:t}=e;t.registerModule(U),console.log("Hello from object merger bundle.")}}},6942(e){!function(){"use strict";var t={}.hasOwnProperty;function i(){for(var e="",n=0;n<arguments.length;n++){var a=arguments[n];a&&(e=l(e,function(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return i.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var n="";for(var a in e)t.call(e,a)&&e[a]&&(n=l(n,a));return n}(a)))}return e}function l(e,t){return t?e?e+" "+t:e+t:e}e.exports?(i.default=i,e.exports=i):"function"==typeof define&&"object"==typeof define.amd&&define.amd?define("classnames",[],function(){return i}):window.classNames=i}()}}]);