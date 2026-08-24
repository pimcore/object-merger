/*! For license information please see __federation_expose_default_export.910939a5.js.LICENSE.txt */
(self["chunk_pimcore_objectmerger_bundle "]=self["chunk_pimcore_objectmerger_bundle "]||[]).push([["525"],{1020(e,t,i){"use strict";var l=i(6798),n=Symbol.for("react.element"),a=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,r=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function s(e,t,i){var l,a={},s=null,c=null;for(l in void 0!==i&&(s=""+i),void 0!==t.key&&(s=""+t.key),void 0!==t.ref&&(c=t.ref),t)o.call(t,l)&&!d.hasOwnProperty(l)&&(a[l]=t[l]);if(e&&e.defaultProps)for(l in t=e.defaultProps)void 0===a[l]&&(a[l]=t[l]);return{$$typeof:n,type:e,key:s,ref:c,props:a,_owner:r.current}}t.Fragment=a,t.jsx=s,t.jsxs=s},4848(e,t,i){"use strict";e.exports=i(1020)},1004(e,t,i){"use strict";i.r(t),i.d(t,{ObjectMergerPlugin:()=>V});var l=i(2977),n=i(8972),a=i(4781),o=i(2028),r=i(4848),d=i(6798),s=i(4471),c=i(8267),u=i(2703),p=i(1161),m=i(3090);let f=(e,t)=>[e,t].filter(Boolean).join("/"),h=["block"],b=async e=>{let t,{objectId:i,layout:l,objectData:n,objectDataRegistry:a,layoutsList:o,setLayoutsList:r}=e,d={fullPath:(null==n?void 0:n.fullPath)??"",creationDate:(0,c.formatDateTime)({timestamp:(null==n?void 0:n.creationDate)??null,dateStyle:"short",timeStyle:"medium"}),modificationDate:(0,c.formatDateTime)({timestamp:(null==n?void 0:n.modificationDate)??null,dateStyle:"short",timeStyle:"medium"})},u=async e=>{let{data:t,objectValuesData:l=null==n?void 0:n.objectData,fieldBreadcrumbTitle:d="",fieldPath:p=""}=e,m=t.map(async e=>{if("layout"===e.datatype){let t=f(d,e.title);return await u({data:e.children,fieldBreadcrumbTitle:t,objectValuesData:l,fieldPath:p})}if("data"===e.datatype){let t=e.name,n=(0,s.get)(l,t),m=e.fieldtype,b=(0,c.isEmptyValue)(p)?t:`${p}.${t}`;if(!a.hasDynamicType(m))return[];let g=a.getDynamicType(m),j=await g.processVersionFieldData({objectId:i,item:e,fieldBreadcrumbTitle:d,fieldValueByName:n,fieldPath:b,layoutsList:o,setLayoutsList:r,versionId:i,versionCount:1}),v=null==j?void 0:j.map(async e=>{var t,i,n,a;if(l={},!(0,s.isEmpty)(null==e||null==(t=e.fieldData)?void 0:t.children)&&!h.includes(String((null==e||null==(i=e.fieldData)?void 0:i.fieldtype)??""))){let t=f(d,String((null==e||null==(n=e.fieldData)?void 0:n.title)??""));return await u({data:[null==e?void 0:e.fieldData],objectValuesData:{...l,[null==e||null==(a=e.fieldData)?void 0:a.name]:null==e?void 0:e.fieldValue},fieldBreadcrumbTitle:t,fieldPath:(null==e?void 0:e.fieldPath)??""})}return[e]});return(await Promise.all(v)).reduce((e,t)=>e.concat(t),[])}return[]});return(await Promise.all(m)).reduce((e,t)=>e.concat(t),[])},p=await u({data:l});return[...(t=[],Object.entries(d).forEach(e=>{let[i,l]=e;t.push({fieldBreadcrumbTitle:"systemData",fieldData:{title:i,name:i,fieldtype:"input"},fieldValue:l})}),t),...p]},g=e=>{var t,i;let l=e.fieldBreadcrumbTitle??"",n=(null==(t=e.fieldData)?void 0:t.name)??"",a=(null==(i=e.fieldData)?void 0:i.locale)??"default";return`${l}-${n}-${a}`},j=(0,d.createContext)(void 0),v=e=>{let{children:t,initialObjects:i,initialRoles:l,onMerged:n}=e,[o,f]=(0,d.useState)({A:null==i?void 0:i.A,B:null==i?void 0:i.B}),h=(e=>{let{selectedMergerObjects:t,objectDataRegistry:i,initialRoles:l,onMerged:n}=e,o=(0,a.useAppDispatch)(),[r,f]=(0,d.useState)(!1),[h,j]=(0,d.useState)(!1),[v,y]=(0,d.useState)(l??{main:"A",target:"B"}),[x,S]=(0,d.useState)(new Set),[B,w]=(0,d.useState)([]),[D,F]=(0,d.useState)([]),[T,$]=(0,d.useState)([]),[A,P]=(0,d.useState)(!1),[C,E]=(0,d.useState)(!1),[_,O]=(0,d.useState)({A:!0,B:!0}),[I,k]=(0,d.useState)({A:null,B:null}),[M,N]=(0,d.useState)({A:null,B:null}),[U,R]=(0,d.useState)({A:null,B:null}),V=async()=>{if(!((0,s.isUndefined)(t.A)||(0,s.isUndefined)(t.B))){f(!0),w([]),F([]),S(new Set);try{var e,l,n,a,r,d,c,u;let[m,h,g,j]=await Promise.all([o(p.api.endpoints.dataObjectGetLayoutById.initiate({id:null==t||null==(e=t.A)?void 0:e.id},{forceRefetch:!0})).unwrap(),o(p.api.endpoints.dataObjectGetById.initiate({id:null==t||null==(l=t.A)?void 0:l.id},{forceRefetch:!0})).unwrap(),o(p.api.endpoints.dataObjectGetLayoutById.initiate({id:null==t||null==(n=t.B)?void 0:n.id},{forceRefetch:!0})).unwrap(),o(p.api.endpoints.dataObjectGetById.initiate({id:null==t||null==(a=t.B)?void 0:a.id},{forceRefetch:!0})).unwrap()]);if((null==h?void 0:h.className)!==(null==j?void 0:j.className)){P(!1),E(!1),f(!1);return}let v=await b({objectId:null==t||null==(r=t.A)?void 0:r.id,layout:(null==m?void 0:m.children)??[],objectData:h??{},objectDataRegistry:i,layoutsList:T,setLayoutsList:$}),y=await b({objectId:null==t||null==(d=t.B)?void 0:d.id,layout:(null==g?void 0:g.children)??[],objectData:j??{},objectDataRegistry:i,layoutsList:T,setLayoutsList:$});w(v),F(y),O({A:(null==h||null==(c=h.permissions)?void 0:c.save)!==!1,B:(null==j||null==(u=j.permissions)?void 0:u.save)!==!1});let x=(null==h?void 0:h.objectData)??{},S=(null==j?void 0:j.objectData)??{};k({A:x,B:S}),N({A:(0,s.cloneDeep)(x),B:(0,s.cloneDeep)(S)}),R({A:(0,s.cloneDeep)(x),B:(0,s.cloneDeep)(S)}),E(!0)}catch(e){console.error("Failed to load merger data",e)}finally{f(!1)}}},W=(0,d.useMemo)(()=>(0,s.isEmpty)(B)||(0,s.isEmpty)(D)?[]:((e,t,i,l,n)=>{let a=[],o=new Map(e.map(e=>[g(e),e])),r=new Map(t.map(e=>[g(e),e]));for(let e of new Set([...o.keys(),...r.keys()])){var d,c;let t=o.get(e),u=r.get(e),p="A"===i.main?t:u,m="B"===i.target?u:t,f="B"===i.main?(0,s.get)(n.B,(null==u?void 0:u.fieldPath)??""):(0,s.get)(n.A,(null==t?void 0:t.fieldPath)??""),h="B"===i.target?(0,s.get)(n.B,(null==u?void 0:u.fieldPath)??""):(0,s.get)(n.A,(null==t?void 0:t.fieldPath)??""),b=(0,s.isUndefined)(f)?(null==p?void 0:p.fieldValue)??null:f,g=(0,s.isUndefined)(h)?(null==m?void 0:m.fieldValue)??null:h,j=(null==p?void 0:p.fieldPath)??(null==m?void 0:m.fieldPath)??(null==p||null==(d=p.fieldData)?void 0:d.name)??(null==m||null==(c=m.fieldData)?void 0:c.name),v={Field:{fieldBreadcrumbTitle:(null==p?void 0:p.fieldBreadcrumbTitle)??(null==m?void 0:m.fieldBreadcrumbTitle),...(null==p?void 0:p.fieldData)??(null==m?void 0:m.fieldData)},main:b,target:g,isTouched:l.has(j),isDifferent:!(0,s.isEqual)(b,g),fieldPath:(null==p?void 0:p.fieldPath)??(null==m?void 0:m.fieldPath)};if("fieldcollections"===v.Field.fieldtype){let e=(null==b?void 0:b.length)??0,i=(null==g?void 0:g.length)??0,l=i>e?u:t,n=e<i?t:u;v.fieldCollectionModifiedList=(0,s.differenceWith)((null==l?void 0:l.fieldValue)??[],(null==n?void 0:n.fieldValue)??[],(e,t)=>(null==e?void 0:e.type)===(null==t?void 0:t.type)&&(0,s.isEqual)(null==e?void 0:e.data,null==t?void 0:t.data)).map(e=>e.type)}a.push(v)}return a})(B,D,v,x,U),[B,D,v,x,U]),L=(0,d.useMemo)(()=>{let e=v.target;return!(0,s.isEqual)(U[e],M[e])},[U,M,v]),H=(0,d.useMemo)(()=>_[v.target],[_,v]),X=(0,d.useCallback)(e=>{let t=v.main,i=v.target,l=(0,s.get)(U[t],e),n=(0,s.isUndefined)(l)?null:l;R(t=>{let l=(0,s.cloneDeep)(t);return(0,s.setWith)(l[i],e,n,Object),l}),S(t=>new Set([...t,e]))},[v,U]),z=(0,d.useCallback)(()=>{let e="A"===v.main?B:D,t="B"===v.target?D:B,i=v.main,l=v.target,n=new Set,a=(0,s.cloneDeep)(U[l]);((null==e?void 0:e.length)>(null==t?void 0:t.length)?e:t).forEach(l=>{let o=e.find(e=>e.fieldPath===l.fieldPath),r=t.find(e=>e.fieldPath===l.fieldPath);if(!(0,s.isEqual)(null==o?void 0:o.fieldValue,null==r?void 0:r.fieldValue)){let e=(0,c.isEmptyValue)(null==l?void 0:l.fieldPath)?null==l?void 0:l.fieldData.name:null==l?void 0:l.fieldPath,t=(0,s.get)(U[i],e),o=(0,s.isUndefined)(t)?null:t;(0,s.setWith)(a,e,o,Object),n.add(e)}}),R(e=>({...e,[l]:a})),S(e=>new Set([...e,...n]))},[B,D,v,U]),K=(0,d.useCallback)(e=>{let t=v.target,i=(0,s.get)(I[t],e);R(l=>{let n=(0,s.cloneDeep)(l);return null!==n[t]&&(0,s.setWith)(n[t],e,i,Object),n}),S(t=>{let i=new Set(t);return i.delete(e),i})},[v,I]),q=(0,d.useCallback)(()=>{let e=v.target;R(t=>({...t,[e]:(0,s.cloneDeep)(I[e])})),S(new Set)},[v,I]),G=(0,d.useCallback)(async()=>{let e=v.target,l={},a=U[e],r=M[e];if(("A"===e?B:D).forEach(e=>{let t=(0,c.isEmptyValue)(e.fieldPath)?e.fieldData.name:e.fieldPath,n=(0,s.get)(a,t),o=(0,s.get)(r,t);if(!(0,s.isEqual)(n,o)){var d;let a=null==(d=e.fieldData)?void 0:d.fieldtype,o=i.hasDynamicType(a)?i.getDynamicType(a):null,r=(null==o?void 0:o.supportsBatchAppendModes)===!0?(0,m.addBatchAppendMode)(n,m.BatchAppendMode.Replace):n;(0,s.setWith)(l,t,r,Object)}}),!(0,s.isEmpty)(l)){j(!0);try{var d;await o(p.api.endpoints.dataObjectPatchById.initiate({body:{data:[{id:null==t||null==(d=t[e])?void 0:d.id,task:"save",editableData:l}]}})).unwrap(),N(t=>({...t,[e]:(0,s.cloneDeep)(U[e])})),null==n||n()}catch(e){(0,u.trackError)(new u.ApiError(e))}finally{j(!1)}}},[v,U,I,x,t,o,n]);return{loadLayoutData:V,refetch:()=>{V()},isFetching:r,isLoading:r,isSaving:h,mergerFields:W,roles:v,touchedFields:x,copyFieldToTarget:X,applyAll:z,resetField:K,resetAll:q,mirror:()=>{y(e=>({main:e.target,target:e.main})),R({A:(0,s.cloneDeep)(I.A),B:(0,s.cloneDeep)(I.B)}),S(new Set)},save:G,versions:U,initialVersions:I,isSameObjectType:A,setIsSameObjectType:P,canCompare:C,setCanCompare:E,hasUnsavedChanges:L,canSaveTarget:H}})({selectedMergerObjects:o,objectDataRegistry:(0,a.useInjection)(a.serviceIds["DynamicTypes/ObjectDataRegistry"]),initialRoles:l,onMerged:n}),{setCanCompare:v,setIsSameObjectType:y}=h,x=!(0,s.isUndefined)(null==i?void 0:i.A)&&!(0,s.isUndefined)(null==i?void 0:i.B);(0,d.useEffect)(()=>{let e=!(0,s.isUndefined)(null==o?void 0:o.A)&&!(0,s.isUndefined)(null==o?void 0:o.B);y(!0),v(e),x&&e&&h.refetch()},[null==o?void 0:o.A,null==o?void 0:o.B]);let S=(0,d.useMemo)(()=>({...h,selectedMergerObjects:o,setSelectedMergerObjects:f,autoCompare:x}),[h,o,f,x]);return(0,r.jsx)(j.Provider,{value:S,children:t})},y=()=>{let e=(0,d.useContext)(j);if((0,s.isUndefined)(e))throw Error("useObjectMergerContext must be used within a ObjectMergerProvider");return e};var x=i(2696),S=i(9432);let B=(0,S.createStyles)(e=>{let{token:t,css:i}=e;return{formWrapper:i`
      min-width: 400px;
    `}}),w=()=>{var e,t;let{t:i}=(0,a.useTranslation)(),{styles:l}=B(),n=(0,a.useAppDispatch)(),o=(0,d.useRef)(!1),{selectedMergerObjects:c,setSelectedMergerObjects:u,loadLayoutData:m,isLoading:f,canCompare:h,isSameObjectType:b,autoCompare:g}=y(),j=!(0,s.isUndefined)(null==c?void 0:c.A)&&!(0,s.isUndefined)(null==c?void 0:c.B)&&!b;return(0,d.useEffect)(()=>{var e,t,i,l;!g||(0,s.isUndefined)(null==c||null==(e=c.A)?void 0:e.id)||(0,s.isUndefined)(null==c||null==(t=c.B)?void 0:t.id)||!(0,s.isNil)(null==c||null==(i=c.A)?void 0:i.fullPath)&&!(0,s.isNil)(null==c||null==(l=c.B)?void 0:l.fullPath)||(async()=>{let[e,t]=await Promise.all([n(p.api.endpoints.dataObjectGetById.initiate({id:c.A.id},{forceRefetch:!1})).unwrap(),n(p.api.endpoints.dataObjectGetById.initiate({id:c.B.id},{forceRefetch:!1})).unwrap()]);u({A:{...c.A,fullPath:(null==e?void 0:e.fullPath)??""},B:{...c.B,fullPath:(null==t?void 0:t.fullPath)??""}})})()},[g,null==c||null==(e=c.A)?void 0:e.id,null==c||null==(t=c.B)?void 0:t.id]),(0,d.useEffect)(()=>{g&&h&&!o.current&&(o.current=!0,m())},[g,h]),(0,r.jsx)(x.Content,{padded:!0,padding:{x:"small",y:"extra-small"},children:(0,r.jsxs)(x.Flex,{gap:"extra-small",vertical:!0,children:[(0,r.jsx)(x.Title,{children:i("compare_objects.title")}),(0,r.jsxs)(x.Flex,{align:"flex-end",gap:"extra-small",children:[(0,r.jsx)("div",{className:l.formWrapper,children:(0,r.jsxs)(x.FormKit,{children:[(0,r.jsx)(x.Form.Item,{name:"mainObject",children:(0,r.jsx)(x.ManyToOneRelationInput,{dataObjectsAllowed:!0,enableSearch:!0,onChange:e=>{u({A:e,B:null==c?void 0:c.B})},value:null==c?void 0:c.A})}),(0,r.jsx)(x.Form.Item,{name:"compareObject",children:(0,r.jsx)(x.ManyToOneRelationInput,{dataObjectsAllowed:!0,enableSearch:!0,onChange:e=>{u({A:null==c?void 0:c.A,B:e})},value:null==c?void 0:c.B})})]})}),(0,r.jsx)(x.Button,{disabled:!h,loading:f,onClick:()=>{m()},type:"primary",children:i("compare_objects.form.compare_btn")})]}),j&&(0,r.jsx)(x.Alert,{message:i("compare_objects.form.error.different_object_types"),type:"error"})]})})};var D=i(3842);let F=["reverseObjectRelation"];var T=i(6942),$=i.n(T);let A=["main","target"],P=(0,S.createStyles)(e=>{let{token:t,css:i}=e;return{headerContainer:i`
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
    `}}),C=["systemData"],E=["block","fieldcollections"],_=e=>{let{breadcrumbsList:t,mergerData:i,isExpandedUnmodifiedFields:l}=e,{t:n}=(0,a.useTranslation)(),{styles:o}=P(),{selectedMergerObjects:d,roles:p,copyFieldToTarget:f,resetField:h}=y();return(0,r.jsx)(r.Fragment,{children:null==t?void 0:t.map((e,t)=>{let a="systemData"===e.key;return(0,r.jsxs)("div",{children:[(e=>{let{key:t,isCommonSection:i}=e,l=C.includes(t),a=(l?n(`version.category.title.${t}`):t).split("/"),[d,...s]=l?a:a.map(e=>n(e)),u=s.length>0?` | ${s.join(" | ")}`:"";return(0,c.isEmptyValue)(d)&&(0,c.isEmptyValue)(u)?null:(0,r.jsxs)(x.Text,{className:$()(o.sectionTitle,{[o.subSectionTitle]:!i}),strong:!0,children:[d,!(0,c.isEmptyValue)(u)&&(0,r.jsx)("span",{className:o.subSectionText,children:u})]})})({key:e.key,isCommonSection:a}),(0,r.jsx)(x.Flex,{className:$()(o.sectionFields,{[o.sectionFieldsWithoutBorder]:!a}),gap:"extra-small",vertical:!0,children:i.map((t,i)=>{let b=e.key===t.Field.fieldBreadcrumbTitle,g=e.fieldKeys.includes(t.Field.name);return b&&g&&(0,r.jsx)(u.AutoHideEmptyContent,{contentSelector:`.${o.objectSectionFieldItemContent}`,children:(0,r.jsx)("div",{children:(0,r.jsx)(x.Flex,{gap:"mini",children:A.map((e,i)=>{var u;let b=null==t?void 0:t.isDifferent,g=0===i,j=1===i,v=0===i?p.main:p.target,y=null==d||null==(u=d[v])?void 0:u.id,S=E.includes(t.Field.fieldtype),B=(b||t.isTouched)&&S&&(0,c.isEmptyValue)(t[e]);return(0,r.jsxs)(x.Flex,{className:o.objectSectionFieldItemWrapper,gap:"mini",vertical:!0,children:[(0,r.jsx)("div",{children:(e=>{let{fieldItem:t,isCommonSection:i,isMainVersion:l,isCompareVersion:a}=e,d=t.Field.title,u=t.Field.locale;if((0,c.isEmptyValue)(d))return(0,r.jsx)(r.Fragment,{});let p=i?n(`version.${d}`):n(d);return(0,r.jsx)("div",{className:o.fieldTitle,children:(0,r.jsxs)(x.Flex,{align:"center",className:o.fieldTitleContent,justify:"space-between",children:[l&&(0,r.jsxs)(x.Text,{children:[p," ",!(0,s.isEmpty)(u)&&(0,r.jsxs)(x.Text,{type:"secondary",children:["| ",u.toUpperCase()]})]}),!i&&l&&t.isDifferent&&(0,r.jsx)(x.IconButton,{icon:{value:"arrow-square-right"},onClick:()=>{f((null==t?void 0:t.fieldPath)??"")},size:"small"}),!i&&l&&!t.isDifferent&&!t.isTouched&&(0,r.jsx)(x.IconButton,{disabled:!0,icon:{value:"lock"},size:"small"}),!i&&a&&t.isTouched&&(0,r.jsx)(x.IconButton,{danger:!0,icon:{value:"corner-up-left"},onClick:()=>{h((null==t?void 0:t.fieldPath)??"")},size:"small"})]})})})({fieldItem:t,isCommonSection:a,isMainVersion:g,isCompareVersion:j})}),(0,r.jsxs)("div",{className:o.objectSectionFieldItemContent,children:[B&&(0,r.jsx)(x.Flex,{align:"center",className:$()(o.objectSectionFieldItem,o.objectSectionEmptyState,{[o.objectSectionEmptyStateDisabled]:g,[o.objectSectionEmptyStateHighlight]:j&&b}),justify:"center",children:n("compare_objects.empty")}),(0,r.jsx)(m.DataObjectProvider,{id:y,children:(0,r.jsx)(D.FieldCollectionProvider,{id:y,children:(0,r.jsx)(m.DataComponent,{className:$()(o.objectSectionFieldItem,"versionFieldItem",{[o.objectSectionFieldItemHighlight]:b&&j&&!a,versionFieldItemHighlight:b&&j&&!a}),datatype:"data",fieldCollectionModifiedList:null==t?void 0:t.fieldCollectionModifiedList,fieldType:t.Field.fieldtype,isExpandedUnmodifiedFields:l,...t.Field,name:t.Field.name,value:t[e]},`${t.fieldPath}-${t.isTouched}-${e}`)},`${y}-${t.fieldPath}-${t.isTouched}-${e}`)},`${y}-${t.fieldPath}-${t.isTouched}-${e}`)]})]},`${i}-${e}`)})})})},`${i}-${t.Field.name}`)})})]},`${t}-${e.key}`)})})},O=e=>{let t,{hideObjectHeader:i=!1}=e,{t:l}=(0,a.useTranslation)(),{styles:n}=P(),{selectedMergerObjects:o,canCompare:c,mergerFields:u,isLoading:p,roles:m}=y(),{openElement:f}=(0,D.useElementHelper)(),[h,b]=(0,d.useState)(!1),g=(0,d.useMemo)(()=>u.filter(e=>!(0,s.isEqual)((null==e?void 0:e.main)??null,(null==e?void 0:e.target)??null)||e.isTouched),[u]),j=(0,d.useMemo)(()=>h?u:g,[h,u,g]),v=(0,d.useMemo)(()=>{let e;return e={},u.forEach(t=>{let i=t.Field.fieldBreadcrumbTitle??"systemData";F.includes(t.Field.fieldtype)||((0,s.isUndefined)(e[i])&&(e[i]=new Set),e[i].add(t.Field.name))}),Object.entries(e).map(e=>{let[t,i]=e;return{key:t,fieldKeys:Array.from(i)}})},[u]),S=(0,d.useMemo)(()=>(e=>{let{data:t,breadcrumbsList:i}=e,l=(0,s.map)(t,"Field.name"),n=(0,s.map)(t,"Field.fieldBreadcrumbTitle");return(0,s.isEmpty)(i)?[]:(0,s.filter)((0,s.map)(i,e=>({...e,fieldKeys:(0,s.intersection)(e.fieldKeys,l)})),e=>!(0,s.isEmpty)(e.fieldKeys)&&n.includes(e.key))})({data:j,breadcrumbsList:v}),[j,v]),B=(0,d.useMemo)(()=>(0,s.isEmpty)(g)?[]:g.map(e=>e.Field.title),[g]),w=!(0,s.isUndefined)(B)&&B.length>0;return(0,r.jsxs)(x.Content,{centered:!c,loading:p,padded:!0,padding:{x:"small",y:"extra-small"},children:[!c&&(0,r.jsx)(x.Text,{type:"secondary",children:l("compare_objects.initial_description")}),c&&!(0,s.isEmpty)(j)&&(0,r.jsxs)(x.Flex,{vertical:!0,children:[!i&&(0,r.jsx)(x.Flex,{className:n.headerContainer,wrap:"wrap",children:(t=[m.main,m.target],(0,r.jsx)(r.Fragment,{children:t.map(e=>{let t=o[e];return(0,r.jsxs)(x.Flex,{align:"center",className:n.headerItem,justify:"space-between",children:[(0,r.jsxs)(x.Text,{strong:!0,children:[null==t?void 0:t.fullPath," (id:",null==t?void 0:t.id,")"]}),(0,r.jsx)(x.IconButton,{icon:{value:"open-folder"},onClick:()=>{f({id:Number(null==t?void 0:t.id),type:"data-object"})},type:"link"})]},`${e}-${null==t?void 0:t.id}`)})}))}),(0,r.jsxs)(x.Flex,{className:n.content,vertical:!0,children:[(0,r.jsx)("div",{className:n.switchContainer,children:(0,r.jsx)(x.Switch,{labelLeft:(0,r.jsx)(x.Text,{children:l("compare_objects.expand_unmodified_fields")}),onChange:()=>{b(!h)},value:h})}),!w&&!h&&(0,r.jsx)(x.Flex,{justify:"center",children:(0,r.jsx)(x.Text,{className:n.emptyState,children:l("compare_objects.no_difference")})}),(0,r.jsx)(_,{breadcrumbsList:S,isExpandedUnmodifiedFields:h,mergerData:j})]})]})]})},I=()=>{let{t:e}=(0,a.useTranslation)(),{canCompare:t,mergerFields:i,touchedFields:l,mirror:n,applyAll:o,resetAll:d,save:c,isSaving:u,hasUnsavedChanges:p,canSaveTarget:m}=y();return!t||(0,s.isEmpty)(i)?(0,r.jsx)(r.Fragment,{}):(0,r.jsxs)(x.Toolbar,{justify:"space-between",children:[(0,r.jsxs)(x.Flex,{gap:"extra-small",children:[(0,r.jsx)(x.IconTextButton,{icon:{value:"contrast-01"},onClick:n,children:e("compare_objects.toolbar.mirror_view")}),(0,r.jsx)(x.Tooltip,{title:e("compare_objects.toolbar.apply_all.description"),children:(0,r.jsx)(x.Button,{onClick:o,children:e("compare_objects.toolbar.apply_all")})})]}),(0,r.jsxs)(x.Flex,{gap:"extra-small",children:[(0,r.jsx)(x.Button,{disabled:(0,s.isEmpty)(l),onClick:d,children:e("compare_objects.toolbar.reset")}),(0,r.jsx)(x.Tooltip,{title:m?"":e("compare_objects.toolbar.save.no_permission"),children:(0,r.jsx)(x.Button,{disabled:!p||!m,loading:u,onClick:c,type:"primary",children:e("compare_objects.toolbar.save")})})]})]})},k=e=>{let{embedded:t=!1}=e;return(0,r.jsx)(x.ContentLayout,{renderToolbar:(0,r.jsx)(I,{}),renderTopBar:t?void 0:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(w,{}),(0,r.jsx)(x.Divider,{size:"none",theme:"secondary"})]}),children:(0,r.jsx)(O,{hideObjectHeader:t})})},M=(e,t)=>{a.store.dispatch((0,o.openMainWidget)({name:"ObjectMergerPage",id:`object-merger-page-${e}-${t}`,component:"object-merger-page",config:{translationKey:"compare_objects.nav.compare_objects",icon:{type:"name",value:"compare"},initialObjectA:{type:"object",id:e},initialObjectB:{type:"object",id:t}}}))},N={mergeObjects:M,EmbeddedComponent:e=>{let{objectAId:t,objectBId:i,initialRoles:l,onMerged:n}=e;return(0,r.jsx)(v,{initialObjects:{A:{type:"object",id:t},B:{type:"object",id:i}},initialRoles:l,onMerged:n,children:(0,r.jsx)(k,{embedded:!0})})}},U=e=>{let{initialObjectA:t,initialObjectB:i}=e,l=(0,s.isUndefined)(t)||(0,s.isUndefined)(i)?void 0:{A:t,B:i};return(0,r.jsx)(v,{initialObjects:l,children:(0,r.jsx)(k,{})})},R={onInit:()=>{l.container.get(a.serviceIds.mainNavRegistry).registerMainNavItem({path:"DataManagement/Compare Objects",label:"compare_objects.nav.compare_objects",order:500,permission:n.UserPermission.Objects,widgetConfig:{name:"ObjectMergerPage",id:"object-merger-page",component:"object-merger-page",config:{translationKey:"compare_objects.nav.compare_objects",icon:{type:"name",value:"compare"}}}}),l.container.get(a.serviceIds.widgetManager).registerWidget({name:"object-merger-page",component:U}),window.PimcoreStudioObjectMerger={mergeObjects:M}}};void 0!==(e=i.hmd(e)).hot&&e.hot.accept();let V={name:"object-merger-plugin",onInit:e=>{let{container:t}=e;t.bind("ObjectMerger/Api").toConstantValue(N)},onStartup:e=>{let{moduleSystem:t}=e;t.registerModule(R),console.log("Hello from object merger bundle.")}}},6942(e){!function(){"use strict";var t={}.hasOwnProperty;function i(){for(var e="",n=0;n<arguments.length;n++){var a=arguments[n];a&&(e=l(e,function(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return i.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var n="";for(var a in e)t.call(e,a)&&e[a]&&(n=l(n,a));return n}(a)))}return e}function l(e,t){return t?e?e+" "+t:e+t:e}e.exports?(i.default=i,e.exports=i):"function"==typeof define&&"object"==typeof define.amd&&define.amd?define("classnames",[],function(){return i}):window.classNames=i}()}}]);