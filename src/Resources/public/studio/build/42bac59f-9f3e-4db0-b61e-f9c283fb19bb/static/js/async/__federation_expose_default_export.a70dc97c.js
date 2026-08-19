/*! For license information please see __federation_expose_default_export.a70dc97c.js.LICENSE.txt */
(self["chunk_pimcore_objectmerger_bundle "]=self["chunk_pimcore_objectmerger_bundle "]||[]).push([["525"],{1020(e,t,i){"use strict";var l=i(6798),n=Symbol.for("react.element"),a=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,r=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function s(e,t,i){var l,a={},s=null,c=null;for(l in void 0!==i&&(s=""+i),void 0!==t.key&&(s=""+t.key),void 0!==t.ref&&(c=t.ref),t)o.call(t,l)&&!d.hasOwnProperty(l)&&(a[l]=t[l]);if(e&&e.defaultProps)for(l in t=e.defaultProps)void 0===a[l]&&(a[l]=t[l]);return{$$typeof:n,type:e,key:s,ref:c,props:a,_owner:r.current}}t.Fragment=a,t.jsx=s,t.jsxs=s},4848(e,t,i){"use strict";e.exports=i(1020)},6390(e,t,i){"use strict";i.r(t),i.d(t,{ObjectMergerPlugin:()=>R});var l=i(2977),n=i(2028),a=i(8972),o=i(4781),r=i(4848),d=i(6798),s=i(4471),c=i(8267),u=i(2703),p=i(1161),m=i(3090);let f=(e,t)=>[e,t].filter(Boolean).join("/"),h=["block"],b=async e=>{let t,{objectId:i,layout:l,objectData:n,objectDataRegistry:a,layoutsList:o,setLayoutsList:r}=e,d={fullPath:(null==n?void 0:n.fullPath)??"",creationDate:(0,c.formatDateTime)({timestamp:(null==n?void 0:n.creationDate)??null,dateStyle:"short",timeStyle:"medium"}),modificationDate:(0,c.formatDateTime)({timestamp:(null==n?void 0:n.modificationDate)??null,dateStyle:"short",timeStyle:"medium"})},u=async e=>{let{data:t,objectValuesData:l=null==n?void 0:n.objectData,fieldBreadcrumbTitle:d="",fieldPath:p=""}=e,m=t.map(async e=>{if("layout"===e.datatype){let t=f(d,e.title);return await u({data:e.children,fieldBreadcrumbTitle:t,objectValuesData:l,fieldPath:p})}if("data"===e.datatype){let t=e.name,n=(0,s.get)(l,t),m=e.fieldtype,b=(0,c.isEmptyValue)(p)?t:`${p}.${t}`;if(!a.hasDynamicType(m))return[];let g=a.getDynamicType(m),v=await g.processVersionFieldData({objectId:i,item:e,fieldBreadcrumbTitle:d,fieldValueByName:n,fieldPath:b,layoutsList:o,setLayoutsList:r,versionId:i,versionCount:1}),j=null==v?void 0:v.map(async e=>{var t,i,n,a;if(l={},!(0,s.isEmpty)(null==e||null==(t=e.fieldData)?void 0:t.children)&&!h.includes(String((null==e||null==(i=e.fieldData)?void 0:i.fieldtype)??""))){let t=f(d,String((null==e||null==(n=e.fieldData)?void 0:n.title)??""));return await u({data:[null==e?void 0:e.fieldData],objectValuesData:{...l,[null==e||null==(a=e.fieldData)?void 0:a.name]:null==e?void 0:e.fieldValue},fieldBreadcrumbTitle:t,fieldPath:(null==e?void 0:e.fieldPath)??""})}return[e]});return(await Promise.all(j)).reduce((e,t)=>e.concat(t),[])}return[]});return(await Promise.all(m)).reduce((e,t)=>e.concat(t),[])},p=await u({data:l});return[...(t=[],Object.entries(d).forEach(e=>{let[i,l]=e;t.push({fieldBreadcrumbTitle:"systemData",fieldData:{title:i,name:i,fieldtype:"input"},fieldValue:l})}),t),...p]},g=e=>{var t,i;let l=e.fieldBreadcrumbTitle??"",n=(null==(t=e.fieldData)?void 0:t.name)??"",a=(null==(i=e.fieldData)?void 0:i.locale)??"default";return`${l}-${n}-${a}`},v=(0,d.createContext)(void 0),j=e=>{let{children:t,initialObjects:i}=e,[l,n]=(0,d.useState)({A:null==i?void 0:i.A,B:null==i?void 0:i.B}),a=(e=>{let{selectedMergerObjects:t,objectDataRegistry:i}=e,l=(0,o.useAppDispatch)(),[n,a]=(0,d.useState)(!1),[r,f]=(0,d.useState)(!1),[h,v]=(0,d.useState)({main:"A",target:"B"}),[j,x]=(0,d.useState)(new Set),[y,S]=(0,d.useState)([]),[B,w]=(0,d.useState)([]),[D,F]=(0,d.useState)([]),[T,$]=(0,d.useState)(!1),[P,A]=(0,d.useState)(!1),[_,C]=(0,d.useState)({A:!0,B:!0}),[E,I]=(0,d.useState)({A:null,B:null}),[k,O]=(0,d.useState)({A:null,B:null}),[M,N]=(0,d.useState)({A:null,B:null}),U=async()=>{if(!((0,s.isUndefined)(t.A)||(0,s.isUndefined)(t.B))){a(!0),S([]),w([]),x(new Set);try{var e,n,o,r,d,c,u,m;let[f,h,g,v]=await Promise.all([l(p.api.endpoints.dataObjectGetLayoutById.initiate({id:null==t||null==(e=t.A)?void 0:e.id},{forceRefetch:!0})).unwrap(),l(p.api.endpoints.dataObjectGetById.initiate({id:null==t||null==(n=t.A)?void 0:n.id},{forceRefetch:!0})).unwrap(),l(p.api.endpoints.dataObjectGetLayoutById.initiate({id:null==t||null==(o=t.B)?void 0:o.id},{forceRefetch:!0})).unwrap(),l(p.api.endpoints.dataObjectGetById.initiate({id:null==t||null==(r=t.B)?void 0:r.id},{forceRefetch:!0})).unwrap()]);if((null==h?void 0:h.className)!==(null==v?void 0:v.className)){$(!1),A(!1),a(!1);return}let j=await b({objectId:null==t||null==(d=t.A)?void 0:d.id,layout:(null==f?void 0:f.children)??[],objectData:h??{},objectDataRegistry:i,layoutsList:D,setLayoutsList:F}),x=await b({objectId:null==t||null==(c=t.B)?void 0:c.id,layout:(null==g?void 0:g.children)??[],objectData:v??{},objectDataRegistry:i,layoutsList:D,setLayoutsList:F});S(j),w(x),C({A:(null==h||null==(u=h.permissions)?void 0:u.save)!==!1,B:(null==v||null==(m=v.permissions)?void 0:m.save)!==!1});let y=(null==h?void 0:h.objectData)??{},B=(null==v?void 0:v.objectData)??{};I({A:y,B:B}),O({A:(0,s.cloneDeep)(y),B:(0,s.cloneDeep)(B)}),N({A:(0,s.cloneDeep)(y),B:(0,s.cloneDeep)(B)}),A(!0)}catch(e){console.error("Failed to load merger data",e)}finally{a(!1)}}},R=(0,d.useMemo)(()=>(0,s.isEmpty)(y)||(0,s.isEmpty)(B)?[]:((e,t,i,l,n)=>{let a=[],o=new Map(e.map(e=>[g(e),e])),r=new Map(t.map(e=>[g(e),e]));for(let e of new Set([...o.keys(),...r.keys()])){var d,c;let t=o.get(e),u=r.get(e),p="A"===i.main?t:u,m="B"===i.target?u:t,f="B"===i.main?(0,s.get)(n.B,(null==u?void 0:u.fieldPath)??""):(0,s.get)(n.A,(null==t?void 0:t.fieldPath)??""),h="B"===i.target?(0,s.get)(n.B,(null==u?void 0:u.fieldPath)??""):(0,s.get)(n.A,(null==t?void 0:t.fieldPath)??""),b=(0,s.isUndefined)(f)?(null==p?void 0:p.fieldValue)??null:f,g=(0,s.isUndefined)(h)?(null==m?void 0:m.fieldValue)??null:h,v=(null==p?void 0:p.fieldPath)??(null==m?void 0:m.fieldPath)??(null==p||null==(d=p.fieldData)?void 0:d.name)??(null==m||null==(c=m.fieldData)?void 0:c.name),j={Field:{fieldBreadcrumbTitle:(null==p?void 0:p.fieldBreadcrumbTitle)??(null==m?void 0:m.fieldBreadcrumbTitle),...(null==p?void 0:p.fieldData)??(null==m?void 0:m.fieldData)},main:b,target:g,isTouched:l.has(v),isDifferent:!(0,s.isEqual)(b,g),fieldPath:(null==p?void 0:p.fieldPath)??(null==m?void 0:m.fieldPath)};if("fieldcollections"===j.Field.fieldtype){let e=(null==b?void 0:b.length)??0,i=(null==g?void 0:g.length)??0,l=i>e?u:t,n=e<i?t:u;j.fieldCollectionModifiedList=(0,s.differenceWith)((null==l?void 0:l.fieldValue)??[],(null==n?void 0:n.fieldValue)??[],(e,t)=>(null==e?void 0:e.type)===(null==t?void 0:t.type)&&(0,s.isEqual)(null==e?void 0:e.data,null==t?void 0:t.data)).map(e=>e.type)}a.push(j)}return a})(y,B,h,j,M),[y,B,h,j,M]),V=(0,d.useMemo)(()=>{let e=h.target;return!(0,s.isEqual)(M[e],k[e])},[M,k,h]),W=(0,d.useMemo)(()=>_[h.target],[_,h]),L=(0,d.useCallback)(e=>{let t=h.main,i=h.target,l=(0,s.get)(M[t],e),n=(0,s.isUndefined)(l)?null:l;N(t=>{let l=(0,s.cloneDeep)(t);return(0,s.setWith)(l[i],e,n,Object),l}),x(t=>new Set([...t,e]))},[h,M]),z=(0,d.useCallback)(()=>{let e="A"===h.main?y:B,t="B"===h.target?B:y,i=h.main,l=h.target,n=new Set,a=(0,s.cloneDeep)(M[l]);((null==e?void 0:e.length)>(null==t?void 0:t.length)?e:t).forEach(l=>{let o=e.find(e=>e.fieldPath===l.fieldPath),r=t.find(e=>e.fieldPath===l.fieldPath);if(!(0,s.isEqual)(null==o?void 0:o.fieldValue,null==r?void 0:r.fieldValue)){let e=(0,c.isEmptyValue)(null==l?void 0:l.fieldPath)?null==l?void 0:l.fieldData.name:null==l?void 0:l.fieldPath,t=(0,s.get)(M[i],e),o=(0,s.isUndefined)(t)?null:t;(0,s.setWith)(a,e,o,Object),n.add(e)}}),N(e=>({...e,[l]:a})),x(e=>new Set([...e,...n]))},[y,B,h,M]),H=(0,d.useCallback)(e=>{let t=h.target,i=(0,s.get)(E[t],e);N(l=>{let n=(0,s.cloneDeep)(l);return null!==n[t]&&(0,s.setWith)(n[t],e,i,Object),n}),x(t=>{let i=new Set(t);return i.delete(e),i})},[h,E]),X=(0,d.useCallback)(()=>{let e=h.target;N(t=>({...t,[e]:(0,s.cloneDeep)(E[e])})),x(new Set)},[h,E]),K=(0,d.useCallback)(async()=>{let e=h.target,n={},a=M[e],o=k[e];if(("A"===e?y:B).forEach(e=>{let t=(0,c.isEmptyValue)(e.fieldPath)?e.fieldData.name:e.fieldPath,l=(0,s.get)(a,t),r=(0,s.get)(o,t);if(!(0,s.isEqual)(l,r)){var d;let a=null==(d=e.fieldData)?void 0:d.fieldtype,o=i.hasDynamicType(a)?i.getDynamicType(a):null,r=(null==o?void 0:o.supportsBatchAppendModes)===!0?(0,m.addBatchAppendMode)(l,m.BatchAppendMode.Replace):l;(0,s.setWith)(n,t,r,Object)}}),!(0,s.isEmpty)(n)){f(!0);try{var r;await l(p.api.endpoints.dataObjectPatchById.initiate({body:{data:[{id:null==t||null==(r=t[e])?void 0:r.id,task:"save",editableData:n}]}})).unwrap(),O(t=>({...t,[e]:(0,s.cloneDeep)(M[e])}))}catch(e){(0,u.trackError)(new u.ApiError(e))}finally{f(!1)}}},[h,M,E,j,t,l]);return{loadLayoutData:U,refetch:()=>{U()},isFetching:n,isLoading:n,isSaving:r,mergerFields:R,roles:h,touchedFields:j,copyFieldToTarget:L,applyAll:z,resetField:H,resetAll:X,mirror:()=>{v(e=>({main:e.target,target:e.main})),N({A:(0,s.cloneDeep)(E.A),B:(0,s.cloneDeep)(E.B)}),x(new Set)},save:K,versions:M,initialVersions:E,isSameObjectType:T,setIsSameObjectType:$,canCompare:P,setCanCompare:A,hasUnsavedChanges:V,canSaveTarget:W}})({selectedMergerObjects:l,objectDataRegistry:(0,o.useInjection)(o.serviceIds["DynamicTypes/ObjectDataRegistry"])}),{setCanCompare:f,setIsSameObjectType:h}=a,j=!(0,s.isUndefined)(null==i?void 0:i.A)&&!(0,s.isUndefined)(null==i?void 0:i.B);(0,d.useEffect)(()=>{let e=!(0,s.isUndefined)(null==l?void 0:l.A)&&!(0,s.isUndefined)(null==l?void 0:l.B);h(!0),f(e)},[null==l?void 0:l.A,null==l?void 0:l.B]);let x=(0,d.useMemo)(()=>({...a,selectedMergerObjects:l,setSelectedMergerObjects:n,autoCompare:j}),[a,l,n,j]);return(0,r.jsx)(v.Provider,{value:x,children:t})},x=()=>{let e=(0,d.useContext)(v);if((0,s.isUndefined)(e))throw Error("useObjectMergerContext must be used within a ObjectMergerProvider");return e};var y=i(2696),S=i(9432);let B=(0,S.createStyles)(e=>{let{token:t,css:i}=e;return{formWrapper:i`
      min-width: 400px;
    `}}),w=()=>{var e,t;let{t:i}=(0,o.useTranslation)(),{styles:l}=B(),n=(0,o.useAppDispatch)(),a=(0,d.useRef)(!1),{selectedMergerObjects:c,setSelectedMergerObjects:u,loadLayoutData:m,isLoading:f,canCompare:h,isSameObjectType:b,autoCompare:g}=x(),v=!(0,s.isUndefined)(null==c?void 0:c.A)&&!(0,s.isUndefined)(null==c?void 0:c.B)&&!b;return(0,d.useEffect)(()=>{var e,t,i,l;!g||(0,s.isUndefined)(null==c||null==(e=c.A)?void 0:e.id)||(0,s.isUndefined)(null==c||null==(t=c.B)?void 0:t.id)||!(0,s.isNil)(null==c||null==(i=c.A)?void 0:i.fullPath)&&!(0,s.isNil)(null==c||null==(l=c.B)?void 0:l.fullPath)||(async()=>{let[e,t]=await Promise.all([n(p.api.endpoints.dataObjectGetById.initiate({id:c.A.id},{forceRefetch:!1})).unwrap(),n(p.api.endpoints.dataObjectGetById.initiate({id:c.B.id},{forceRefetch:!1})).unwrap()]);u({A:{...c.A,fullPath:(null==e?void 0:e.fullPath)??""},B:{...c.B,fullPath:(null==t?void 0:t.fullPath)??""}})})()},[g,null==c||null==(e=c.A)?void 0:e.id,null==c||null==(t=c.B)?void 0:t.id]),(0,d.useEffect)(()=>{g&&h&&!a.current&&(a.current=!0,m())},[g,h]),(0,r.jsx)(y.Content,{padded:!0,padding:{x:"small",y:"extra-small"},children:(0,r.jsxs)(y.Flex,{gap:"extra-small",vertical:!0,children:[(0,r.jsx)(y.Title,{children:i("compare_objects.title")}),(0,r.jsxs)(y.Flex,{align:"flex-end",gap:"extra-small",children:[(0,r.jsx)("div",{className:l.formWrapper,children:(0,r.jsxs)(y.FormKit,{children:[(0,r.jsx)(y.Form.Item,{name:"mainObject",children:(0,r.jsx)(y.ManyToOneRelationInput,{dataObjectsAllowed:!0,enableSearch:!0,onChange:e=>{u({A:e,B:null==c?void 0:c.B})},value:null==c?void 0:c.A})}),(0,r.jsx)(y.Form.Item,{name:"compareObject",children:(0,r.jsx)(y.ManyToOneRelationInput,{dataObjectsAllowed:!0,enableSearch:!0,onChange:e=>{u({A:null==c?void 0:c.A,B:e})},value:null==c?void 0:c.B})})]})}),(0,r.jsx)(y.Button,{disabled:!h,loading:f,onClick:()=>{m()},type:"primary",children:i("compare_objects.form.compare_btn")})]}),v&&(0,r.jsx)(y.Alert,{message:i("compare_objects.form.error.different_object_types"),type:"error"})]})})};var D=i(3842);let F=["reverseObjectRelation"];var T=i(6942),$=i.n(T);let P=["main","target"],A=(0,S.createStyles)(e=>{let{token:t,css:i}=e;return{headerContainer:i`
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
    `}}),_=["systemData"],C=["block","fieldcollections"],E=e=>{let{breadcrumbsList:t,mergerData:i,isExpandedUnmodifiedFields:l}=e,{t:n}=(0,o.useTranslation)(),{styles:a}=A(),{selectedMergerObjects:d,roles:p,copyFieldToTarget:f,resetField:h}=x();return(0,r.jsx)(r.Fragment,{children:null==t?void 0:t.map((e,t)=>{let o="systemData"===e.key;return(0,r.jsxs)("div",{children:[(e=>{let{key:t,isCommonSection:i}=e,l=_.includes(t),o=(l?n(`version.category.title.${t}`):t).split("/"),[d,...s]=l?o:o.map(e=>n(e)),u=s.length>0?` | ${s.join(" | ")}`:"";return(0,c.isEmptyValue)(d)&&(0,c.isEmptyValue)(u)?null:(0,r.jsxs)(y.Text,{className:$()(a.sectionTitle,{[a.subSectionTitle]:!i}),strong:!0,children:[d,!(0,c.isEmptyValue)(u)&&(0,r.jsx)("span",{className:a.subSectionText,children:u})]})})({key:e.key,isCommonSection:o}),(0,r.jsx)(y.Flex,{className:$()(a.sectionFields,{[a.sectionFieldsWithoutBorder]:!o}),gap:"extra-small",vertical:!0,children:i.map((t,i)=>{let b=e.key===t.Field.fieldBreadcrumbTitle,g=e.fieldKeys.includes(t.Field.name);return b&&g&&(0,r.jsx)(u.AutoHideEmptyContent,{contentSelector:`.${a.objectSectionFieldItemContent}`,children:(0,r.jsx)("div",{children:(0,r.jsx)(y.Flex,{gap:"mini",children:P.map((e,i)=>{var u;let b=null==t?void 0:t.isDifferent,g=0===i,v=1===i,j=0===i?p.main:p.target,x=null==d||null==(u=d[j])?void 0:u.id,S=C.includes(t.Field.fieldtype),B=(b||t.isTouched)&&S&&(0,c.isEmptyValue)(t[e]);return(0,r.jsxs)(y.Flex,{className:a.objectSectionFieldItemWrapper,gap:"mini",vertical:!0,children:[(0,r.jsx)("div",{children:(e=>{let{fieldItem:t,isCommonSection:i,isMainVersion:l,isCompareVersion:o}=e,d=t.Field.title,u=t.Field.locale;if((0,c.isEmptyValue)(d))return(0,r.jsx)(r.Fragment,{});let p=i?n(`version.${d}`):n(d);return(0,r.jsx)("div",{className:a.fieldTitle,children:(0,r.jsxs)(y.Flex,{align:"center",className:a.fieldTitleContent,justify:"space-between",children:[l&&(0,r.jsxs)(y.Text,{children:[p," ",!(0,s.isEmpty)(u)&&(0,r.jsxs)(y.Text,{type:"secondary",children:["| ",u.toUpperCase()]})]}),!i&&l&&t.isDifferent&&(0,r.jsx)(y.IconButton,{icon:{value:"arrow-square-right"},onClick:()=>{f((null==t?void 0:t.fieldPath)??"")},size:"small"}),!i&&l&&!t.isDifferent&&!t.isTouched&&(0,r.jsx)(y.IconButton,{disabled:!0,icon:{value:"lock"},size:"small"}),!i&&o&&t.isTouched&&(0,r.jsx)(y.IconButton,{danger:!0,icon:{value:"corner-up-left"},onClick:()=>{h((null==t?void 0:t.fieldPath)??"")},size:"small"})]})})})({fieldItem:t,isCommonSection:o,isMainVersion:g,isCompareVersion:v})}),(0,r.jsxs)("div",{className:a.objectSectionFieldItemContent,children:[B&&(0,r.jsx)(y.Flex,{align:"center",className:$()(a.objectSectionFieldItem,a.objectSectionEmptyState,{[a.objectSectionEmptyStateDisabled]:g,[a.objectSectionEmptyStateHighlight]:v&&b}),justify:"center",children:n("compare_objects.empty")}),(0,r.jsx)(m.DataObjectProvider,{id:x,children:(0,r.jsx)(D.FieldCollectionProvider,{id:x,children:(0,r.jsx)(m.DataComponent,{className:$()(a.objectSectionFieldItem,"versionFieldItem",{[a.objectSectionFieldItemHighlight]:b&&v&&!o,versionFieldItemHighlight:b&&v&&!o}),datatype:"data",fieldCollectionModifiedList:null==t?void 0:t.fieldCollectionModifiedList,fieldType:t.Field.fieldtype,isExpandedUnmodifiedFields:l,...t.Field,name:t.Field.name,value:t[e]},`${t.fieldPath}-${t.isTouched}-${e}`)},`${x}-${t.fieldPath}-${t.isTouched}-${e}`)},`${x}-${t.fieldPath}-${t.isTouched}-${e}`)]})]},`${i}-${e}`)})})})},`${i}-${t.Field.name}`)})})]},`${t}-${e.key}`)})})},I=()=>{let e,{t}=(0,o.useTranslation)(),{styles:i}=A(),{selectedMergerObjects:l,canCompare:n,mergerFields:a,isLoading:c,roles:u}=x(),{openElement:p}=(0,D.useElementHelper)(),[m,f]=(0,d.useState)(!1),h=(0,d.useMemo)(()=>a.filter(e=>!(0,s.isEqual)((null==e?void 0:e.main)??null,(null==e?void 0:e.target)??null)||e.isTouched),[a]),b=(0,d.useMemo)(()=>m?a:h,[m,a,h]),g=(0,d.useMemo)(()=>{let e;return e={},a.forEach(t=>{let i=t.Field.fieldBreadcrumbTitle??"systemData";F.includes(t.Field.fieldtype)||((0,s.isUndefined)(e[i])&&(e[i]=new Set),e[i].add(t.Field.name))}),Object.entries(e).map(e=>{let[t,i]=e;return{key:t,fieldKeys:Array.from(i)}})},[a]),v=(0,d.useMemo)(()=>(e=>{let{data:t,breadcrumbsList:i}=e,l=(0,s.map)(t,"Field.name"),n=(0,s.map)(t,"Field.fieldBreadcrumbTitle");return(0,s.isEmpty)(i)?[]:(0,s.filter)((0,s.map)(i,e=>({...e,fieldKeys:(0,s.intersection)(e.fieldKeys,l)})),e=>!(0,s.isEmpty)(e.fieldKeys)&&n.includes(e.key))})({data:b,breadcrumbsList:g}),[b,g]),j=(0,d.useMemo)(()=>(0,s.isEmpty)(h)?[]:h.map(e=>e.Field.title),[h]),S=!(0,s.isUndefined)(j)&&j.length>0;return(0,r.jsxs)(y.Content,{centered:!n,loading:c,padded:!0,padding:{x:"small",y:"extra-small"},children:[!n&&(0,r.jsx)(y.Text,{type:"secondary",children:t("compare_objects.initial_description")}),n&&!(0,s.isEmpty)(b)&&(0,r.jsxs)(y.Flex,{vertical:!0,children:[(0,r.jsx)(y.Flex,{className:i.headerContainer,wrap:"wrap",children:(e=[u.main,u.target],(0,r.jsx)(r.Fragment,{children:e.map(e=>{let t=l[e];return(0,r.jsxs)(y.Flex,{align:"center",className:i.headerItem,justify:"space-between",children:[(0,r.jsxs)(y.Text,{strong:!0,children:[null==t?void 0:t.fullPath," (id:",null==t?void 0:t.id,")"]}),(0,r.jsx)(y.IconButton,{icon:{value:"open-folder"},onClick:()=>{p({id:Number(null==t?void 0:t.id),type:"data-object"})},type:"link"})]},`${e}-${null==t?void 0:t.id}`)})}))}),(0,r.jsxs)(y.Flex,{className:i.content,vertical:!0,children:[(0,r.jsx)("div",{className:i.switchContainer,children:(0,r.jsx)(y.Switch,{labelLeft:(0,r.jsx)(y.Text,{children:t("compare_objects.expand_unmodified_fields")}),onChange:()=>{f(!m)},value:m})}),!S&&!m&&(0,r.jsx)(y.Flex,{justify:"center",children:(0,r.jsx)(y.Text,{className:i.emptyState,children:t("compare_objects.no_difference")})}),(0,r.jsx)(E,{breadcrumbsList:v,isExpandedUnmodifiedFields:m,mergerData:b})]})]})]})},k=e=>{let{isFetching:t,refetch:i}=e;return t?(0,r.jsx)(y.Box,{padding:{x:"extra-small",y:"extra-small"},children:(0,r.jsx)(y.Spin,{})}):(0,r.jsx)(y.IconButton,{icon:{value:"refresh"},onClick:async()=>{i()}})},O=()=>{let{t:e}=(0,o.useTranslation)(),{canCompare:t,mergerFields:i,refetch:l,isFetching:n,touchedFields:a,mirror:d,applyAll:c,resetAll:u,save:p,isSaving:m,hasUnsavedChanges:f,canSaveTarget:h}=x();return!t||(0,s.isEmpty)(i)?(0,r.jsx)(r.Fragment,{}):(0,r.jsxs)(y.Toolbar,{justify:"space-between",children:[(0,r.jsxs)(y.Split,{size:"extra-small",children:[(0,r.jsx)(k,{isFetching:n,refetch:l}),(0,r.jsxs)(y.Flex,{gap:"extra-small",children:[(0,r.jsx)(y.IconTextButton,{icon:{value:"contrast-01"},onClick:d,children:e("compare_objects.toolbar.mirror_view")}),(0,r.jsx)(y.Tooltip,{title:e("compare_objects.toolbar.apply_all.description"),children:(0,r.jsx)(y.IconTextButton,{icon:{value:"corner-up-left"},onClick:c,children:e("compare_objects.toolbar.apply_all")})})]})]}),(0,r.jsxs)(y.Flex,{gap:"extra-small",children:[(0,r.jsx)(y.IconTextButton,{disabled:(0,s.isEmpty)(a),icon:{value:"corner-up-left"},onClick:u,children:e("compare_objects.toolbar.reset")}),(0,r.jsx)(y.Tooltip,{title:h?"":e("compare_objects.toolbar.save.no_permission"),children:(0,r.jsx)(y.Button,{disabled:!f||!h,loading:m,onClick:p,type:"primary",children:e("compare_objects.toolbar.save")})})]})]})},M=()=>(0,r.jsx)(y.ContentLayout,{renderToolbar:(0,r.jsx)(O,{}),renderTopBar:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(w,{}),(0,r.jsx)(y.Divider,{size:"none",theme:"secondary"})]}),children:(0,r.jsx)(I,{})}),N=e=>{let{initialObjectA:t,initialObjectB:i}=e,l=(0,s.isUndefined)(t)||(0,s.isUndefined)(i)?void 0:{A:t,B:i};return(0,r.jsx)(j,{initialObjects:l,children:(0,r.jsx)(M,{})})},U={onInit:()=>{l.container.get(o.serviceIds.mainNavRegistry).registerMainNavItem({path:"DataManagement/Compare Objects",label:"compare_objects.nav.compare_objects",order:500,permission:a.UserPermission.Objects,widgetConfig:{name:"ObjectMergerPage",id:"object-merger-page",component:"object-merger-page",config:{translationKey:"compare_objects.nav.compare_objects",icon:{type:"name",value:"compare"}}}}),l.container.get(o.serviceIds.widgetManager).registerWidget({name:"object-merger-page",component:N}),window.PimcoreStudioObjectMerger={mergeObjects:(e,t)=>{o.store.dispatch((0,n.openMainWidget)({name:"ObjectMergerPage",id:`object-merger-page-${e}-${t}`,component:"object-merger-page",config:{translationKey:"compare_objects.nav.compare_objects",icon:{type:"name",value:"compare"},initialObjectA:{type:"object",id:e},initialObjectB:{type:"object",id:t}}}))}}}};void 0!==(e=i.hmd(e)).hot&&e.hot.accept();let R={name:"object-merger-plugin",onInit:e=>{let{container:t}=e},onStartup:e=>{let{moduleSystem:t}=e;t.registerModule(U),console.log("Hello from object merger bundle.")}}},6942(e){!function(){"use strict";var t={}.hasOwnProperty;function i(){for(var e="",n=0;n<arguments.length;n++){var a=arguments[n];a&&(e=l(e,function(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return i.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var n="";for(var a in e)t.call(e,a)&&e[a]&&(n=l(n,a));return n}(a)))}return e}function l(e,t){return t?e?e+" "+t:e+t:e}e.exports?(i.default=i,e.exports=i):"function"==typeof define&&"object"==typeof define.amd&&define.amd?define("classnames",[],function(){return i}):window.classNames=i}()}}]);