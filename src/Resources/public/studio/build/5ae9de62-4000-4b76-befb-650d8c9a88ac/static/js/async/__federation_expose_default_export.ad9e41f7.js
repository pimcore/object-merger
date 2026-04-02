/*! For license information please see __federation_expose_default_export.ad9e41f7.js.LICENSE.txt */
(self["chunk_pimcore_objectmerger_bundle "]=self["chunk_pimcore_objectmerger_bundle "]||[]).push([["525"],{1020(e,t,i){"use strict";var l=i(6798),n=Symbol.for("react.element"),a=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,r=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function s(e,t,i){var l,a={},s=null,c=null;for(l in void 0!==i&&(s=""+i),void 0!==t.key&&(s=""+t.key),void 0!==t.ref&&(c=t.ref),t)o.call(t,l)&&!d.hasOwnProperty(l)&&(a[l]=t[l]);if(e&&e.defaultProps)for(l in t=e.defaultProps)void 0===a[l]&&(a[l]=t[l]);return{$$typeof:n,type:e,key:s,ref:c,props:a,_owner:r.current}}t.Fragment=a,t.jsx=s,t.jsxs=s},4848(e,t,i){"use strict";e.exports=i(1020)},6390(e,t,i){"use strict";i.r(t),i.d(t,{ObjectMergerPlugin:()=>R});var l=i(2977),n=i(8972),a=i(4781),o=i(4848),r=i(6798),d=i(4471),s=i(8267),c=i(1161),u=i(3090);let p=(e,t)=>[e,t].filter(Boolean).join("/"),m=["block"],f=async e=>{let t,{objectId:i,layout:l,objectData:n,objectDataRegistry:a,layoutsList:o,setLayoutsList:r}=e,c={fullPath:(null==n?void 0:n.fullPath)??"",creationDate:(0,s.formatDateTime)({timestamp:(null==n?void 0:n.creationDate)??null,dateStyle:"short",timeStyle:"medium"}),modificationDate:(0,s.formatDateTime)({timestamp:(null==n?void 0:n.modificationDate)??null,dateStyle:"short",timeStyle:"medium"})},u=async e=>{let{data:t,objectValuesData:l=null==n?void 0:n.objectData,fieldBreadcrumbTitle:c="",fieldPath:f=""}=e,h=t.map(async e=>{if("layout"===e.datatype){let t=p(c,e.title);return await u({data:e.children,fieldBreadcrumbTitle:t,objectValuesData:l,fieldPath:f})}if("data"===e.datatype){let t=e.name,n=(0,d.get)(l,t),h=e.fieldtype,b=(0,s.isEmptyValue)(f)?t:`${f}.${t}`;if(!a.hasDynamicType(h))return[];let g=a.getDynamicType(h),x=await g.processVersionFieldData({objectId:i,item:e,fieldBreadcrumbTitle:c,fieldValueByName:n,fieldPath:b,layoutsList:o,setLayoutsList:r,versionId:i,versionCount:1}),j=null==x?void 0:x.map(async e=>{var t,i,n,a;if(l={},!(0,d.isEmpty)(null==e||null==(t=e.fieldData)?void 0:t.children)&&!m.includes(String((null==e||null==(i=e.fieldData)?void 0:i.fieldtype)??""))){let t=p(c,String((null==e||null==(n=e.fieldData)?void 0:n.title)??""));return await u({data:[null==e?void 0:e.fieldData],objectValuesData:{...l,[null==e||null==(a=e.fieldData)?void 0:a.name]:null==e?void 0:e.fieldValue},fieldBreadcrumbTitle:t,fieldPath:(null==e?void 0:e.fieldPath)??""})}return[e]});return(await Promise.all(j)).reduce((e,t)=>e.concat(t),[])}return[]});return(await Promise.all(h)).reduce((e,t)=>e.concat(t),[])},f=await u({data:l});return[...(t=[],Object.entries(c).forEach(e=>{let[i,l]=e;t.push({fieldBreadcrumbTitle:"systemData",fieldData:{title:i,name:i,fieldtype:"input"},fieldValue:l})}),t),...f]},h=e=>{var t,i;let l=e.fieldBreadcrumbTitle??"",n=(null==(t=e.fieldData)?void 0:t.name)??"",a=(null==(i=e.fieldData)?void 0:i.locale)??"default";return`${l}-${n}-${a}`},b=(0,r.createContext)(void 0),g=e=>{let{children:t}=e,[i,l]=(0,r.useState)({A:void 0,B:void 0}),n=(e=>{let{selectedMergerObjects:t,objectDataRegistry:i}=e,l=(0,a.useAppDispatch)(),[n,o]=(0,r.useState)(!1),[p,m]=(0,r.useState)(!1),[b,g]=(0,r.useState)({main:"A",target:"B"}),[x,j]=(0,r.useState)(new Set),[v,y]=(0,r.useState)([]),[S,B]=(0,r.useState)([]),[w,F]=(0,r.useState)([]),[D,T]=(0,r.useState)(!1),[$,C]=(0,r.useState)(!1),[_,E]=(0,r.useState)({A:!0,B:!0}),[I,k]=(0,r.useState)({A:null,B:null}),[P,A]=(0,r.useState)({A:null,B:null}),[O,M]=(0,r.useState)({A:null,B:null}),N=async()=>{if(!((0,d.isUndefined)(t.A)||(0,d.isUndefined)(t.B))){o(!0),y([]),B([]),j(new Set);try{var e,n,a,r,s,u,p,m;let[h,b,g,x]=await Promise.all([l(c.api.endpoints.dataObjectGetLayoutById.initiate({id:null==t||null==(e=t.A)?void 0:e.id},{forceRefetch:!0})).unwrap(),l(c.api.endpoints.dataObjectGetById.initiate({id:null==t||null==(n=t.A)?void 0:n.id},{forceRefetch:!0})).unwrap(),l(c.api.endpoints.dataObjectGetLayoutById.initiate({id:null==t||null==(a=t.B)?void 0:a.id},{forceRefetch:!0})).unwrap(),l(c.api.endpoints.dataObjectGetById.initiate({id:null==t||null==(r=t.B)?void 0:r.id},{forceRefetch:!0})).unwrap()]);if((null==b?void 0:b.className)!==(null==x?void 0:x.className)){T(!1),C(!1),o(!1);return}let j=await f({objectId:null==t||null==(s=t.A)?void 0:s.id,layout:(null==h?void 0:h.children)??[],objectData:b??{},objectDataRegistry:i,layoutsList:w,setLayoutsList:F}),v=await f({objectId:null==t||null==(u=t.B)?void 0:u.id,layout:(null==g?void 0:g.children)??[],objectData:x??{},objectDataRegistry:i,layoutsList:w,setLayoutsList:F});y(j),B(v),E({A:(null==b||null==(p=b.permissions)?void 0:p.save)!==!1,B:(null==x||null==(m=x.permissions)?void 0:m.save)!==!1});let S=(null==b?void 0:b.objectData)??{},D=(null==x?void 0:x.objectData)??{};k({A:S,B:D}),A({A:(0,d.cloneDeep)(S),B:(0,d.cloneDeep)(D)}),M({A:(0,d.cloneDeep)(S),B:(0,d.cloneDeep)(D)}),C(!0)}catch(e){console.error("Failed to load merger data",e)}finally{o(!1)}}},R=(0,r.useMemo)(()=>(0,d.isEmpty)(v)||(0,d.isEmpty)(S)?[]:((e,t,i,l,n)=>{let a=[],o=new Map(e.map(e=>[h(e),e])),r=new Map(t.map(e=>[h(e),e]));for(let e of new Set([...o.keys(),...r.keys()])){var s,c;let t=o.get(e),u=r.get(e),p="A"===i.main?t:u,m="B"===i.target?u:t,f="B"===i.main?(0,d.get)(n.B,(null==u?void 0:u.fieldPath)??""):(0,d.get)(n.A,(null==t?void 0:t.fieldPath)??""),h="B"===i.target?(0,d.get)(n.B,(null==u?void 0:u.fieldPath)??""):(0,d.get)(n.A,(null==t?void 0:t.fieldPath)??""),b=(0,d.isUndefined)(f)?(null==p?void 0:p.fieldValue)??null:f,g=(0,d.isUndefined)(h)?(null==m?void 0:m.fieldValue)??null:h,x=(null==p?void 0:p.fieldPath)??(null==m?void 0:m.fieldPath)??(null==p||null==(s=p.fieldData)?void 0:s.name)??(null==m||null==(c=m.fieldData)?void 0:c.name),j={Field:{fieldBreadcrumbTitle:(null==p?void 0:p.fieldBreadcrumbTitle)??(null==m?void 0:m.fieldBreadcrumbTitle),...(null==p?void 0:p.fieldData)??(null==m?void 0:m.fieldData)},main:b,target:g,isTouched:l.has(x),isDifferent:!(0,d.isEqual)(b,g),fieldPath:(null==p?void 0:p.fieldPath)??(null==m?void 0:m.fieldPath)};if("fieldcollections"===j.Field.fieldtype){let e=(null==b?void 0:b.length)??0,i=(null==g?void 0:g.length)??0,l=i>e?u:t,n=e<i?t:u;j.fieldCollectionModifiedList=(0,d.differenceWith)((null==l?void 0:l.fieldValue)??[],(null==n?void 0:n.fieldValue)??[],(e,t)=>(null==e?void 0:e.type)===(null==t?void 0:t.type)&&(0,d.isEqual)(null==e?void 0:e.data,null==t?void 0:t.data)).map(e=>e.type)}a.push(j)}return a})(v,S,b,x,O),[v,S,b,x,O]),U=(0,r.useMemo)(()=>{let e=b.target;return!(0,d.isEqual)(O[e],P[e])},[O,P,b]),V=(0,r.useMemo)(()=>_[b.target],[_,b]),W=(0,r.useCallback)(e=>{let t=b.main,i=b.target,l=(0,d.get)(O[t],e),n=(0,d.isUndefined)(l)?null:l;M(t=>{let l=(0,d.cloneDeep)(t);return(0,d.setWith)(l[i],e,n,Object),l}),j(t=>new Set([...t,e]))},[b,O]),L=(0,r.useCallback)(()=>{let e="A"===b.main?v:S,t="B"===b.target?S:v,i=b.main,l=b.target,n=new Set,a=(0,d.cloneDeep)(O[l]);((null==e?void 0:e.length)>(null==t?void 0:t.length)?e:t).forEach(l=>{let o=e.find(e=>e.fieldPath===l.fieldPath),r=t.find(e=>e.fieldPath===l.fieldPath);if(!(0,d.isEqual)(null==o?void 0:o.fieldValue,null==r?void 0:r.fieldValue)){let e=(0,s.isEmptyValue)(null==l?void 0:l.fieldPath)?null==l?void 0:l.fieldData.name:null==l?void 0:l.fieldPath,t=(0,d.get)(O[i],e),o=(0,d.isUndefined)(t)?null:t;(0,d.setWith)(a,e,o,Object),n.add(e)}}),M(e=>({...e,[l]:a})),j(e=>new Set([...e,...n]))},[v,S,b,O]),z=(0,r.useCallback)(e=>{let t=b.target,i=(0,d.get)(I[t],e);M(l=>{let n=(0,d.cloneDeep)(l);return null!==n[t]&&(0,d.setWith)(n[t],e,i,Object),n}),j(t=>{let i=new Set(t);return i.delete(e),i})},[b,I]),H=(0,r.useCallback)(()=>{let e=b.target;M(t=>({...t,[e]:(0,d.cloneDeep)(I[e])})),j(new Set)},[b,I]),X=(0,r.useCallback)(async()=>{let e=b.target,n={},a=O[e],o=P[e];if(("A"===e?v:S).forEach(e=>{let t=(0,s.isEmptyValue)(e.fieldPath)?e.fieldData.name:e.fieldPath,l=(0,d.get)(a,t),r=(0,d.get)(o,t);if(!(0,d.isEqual)(l,r)){var c;let a=null==(c=e.fieldData)?void 0:c.fieldtype,o=i.hasDynamicType(a)?i.getDynamicType(a):null,r=(null==o?void 0:o.supportsBatchAppendModes)===!0?(0,u.addBatchAppendMode)(l,u.BatchAppendMode.Replace):l;(0,d.setWith)(n,t,r,Object)}}),!(0,d.isEmpty)(n)){m(!0);try{var r;await l(c.api.endpoints.dataObjectPatchById.initiate({body:{data:[{id:null==t||null==(r=t[e])?void 0:r.id,task:"save",editableData:n}]}})).unwrap()}catch(e){console.error("Failed to save object",e)}finally{A(t=>({...t,[e]:(0,d.cloneDeep)(O[e])})),m(!1)}}},[b,O,I,x,t,l]);return{loadLayoutData:N,refetch:()=>{N()},isFetching:n,isLoading:n,isSaving:p,mergerFields:R,roles:b,touchedFields:x,copyFieldToTarget:W,applyAll:L,resetField:z,resetAll:H,mirror:()=>{g(e=>({main:e.target,target:e.main})),M({A:(0,d.cloneDeep)(I.A),B:(0,d.cloneDeep)(I.B)}),j(new Set)},save:X,versions:O,initialVersions:I,isSameObjectType:D,setIsSameObjectType:T,canCompare:$,setCanCompare:C,hasUnsavedChanges:U,canSaveTarget:V}})({selectedMergerObjects:i,objectDataRegistry:(0,a.useInjection)(a.serviceIds["DynamicTypes/ObjectDataRegistry"])}),{setCanCompare:p,setIsSameObjectType:m}=n;(0,r.useEffect)(()=>{let e=!(0,d.isUndefined)(null==i?void 0:i.A)&&!(0,d.isUndefined)(null==i?void 0:i.B);m(!0),p(e)},[null==i?void 0:i.A,null==i?void 0:i.B]);let g=(0,r.useMemo)(()=>({...n,selectedMergerObjects:i,setSelectedMergerObjects:l}),[n,i,l]);return(0,o.jsx)(b.Provider,{value:g,children:t})},x=()=>{let e=(0,r.useContext)(b);if((0,d.isUndefined)(e))throw Error("useObjectMergerContext must be used within a ObjectMergerProvider");return e};var j=i(2696),v=i(9432);let y=(0,v.createStyles)(e=>{let{token:t,css:i}=e;return{formWrapper:i`
      min-width: 400px;
    `}}),S=()=>{let{t:e}=(0,a.useTranslation)(),{styles:t}=y(),{selectedMergerObjects:i,setSelectedMergerObjects:l,loadLayoutData:n,isLoading:r,canCompare:s,isSameObjectType:c}=x(),u=!(0,d.isUndefined)(null==i?void 0:i.A)&&!(0,d.isUndefined)(null==i?void 0:i.B)&&!c;return(0,o.jsx)(j.Content,{padded:!0,padding:{x:"small",y:"extra-small"},children:(0,o.jsxs)(j.Flex,{gap:"extra-small",vertical:!0,children:[(0,o.jsx)(j.Title,{children:e("compare_objects.title")}),(0,o.jsxs)(j.Flex,{align:"flex-end",gap:"extra-small",children:[(0,o.jsx)("div",{className:t.formWrapper,children:(0,o.jsxs)(j.FormKit,{children:[(0,o.jsx)(j.Form.Item,{name:"mainObject",children:(0,o.jsx)(j.ManyToOneRelationInput,{dataObjectsAllowed:!0,enableSearch:!0,onChange:e=>{l({A:e,B:null==i?void 0:i.B})},value:null==i?void 0:i.A})}),(0,o.jsx)(j.Form.Item,{name:"compareObject",children:(0,o.jsx)(j.ManyToOneRelationInput,{dataObjectsAllowed:!0,enableSearch:!0,onChange:e=>{l({A:null==i?void 0:i.A,B:e})},value:null==i?void 0:i.B})})]})}),(0,o.jsx)(j.Button,{disabled:!s,loading:r,onClick:()=>{n()},type:"primary",children:e("compare_objects.form.compare_btn")})]}),u&&(0,o.jsx)(j.Alert,{message:e("compare_objects.form.error.different_object_types"),type:"error"})]})})};var B=i(3842);let w=["reverseObjectRelation"];var F=i(6942),D=i.n(F),T=i(2703);let $=["main","target"],C=(0,v.createStyles)(e=>{let{token:t,css:i}=e;return{headerContainer:i`
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
    `}}),_=["systemData"],E=["block","fieldcollections"],I=e=>{let{breadcrumbsList:t,mergerData:i,isExpandedUnmodifiedFields:l}=e,{t:n}=(0,a.useTranslation)(),{styles:r}=C(),{selectedMergerObjects:c,roles:p,copyFieldToTarget:m,resetField:f}=x();return(0,o.jsx)(o.Fragment,{children:null==t?void 0:t.map((e,t)=>{let a="systemData"===e.key;return(0,o.jsxs)("div",{children:[(e=>{let{key:t,isCommonSection:i}=e,l=_.includes(t),a=(l?n(`version.category.title.${t}`):t).split("/"),[d,...c]=l?a:a.map(e=>n(e)),u=c.length>0?` | ${c.join(" | ")}`:"";return(0,s.isEmptyValue)(d)&&(0,s.isEmptyValue)(u)?null:(0,o.jsxs)(j.Text,{className:D()(r.sectionTitle,{[r.subSectionTitle]:!i}),strong:!0,children:[d,!(0,s.isEmptyValue)(u)&&(0,o.jsx)("span",{className:r.subSectionText,children:u})]})})({key:e.key,isCommonSection:a}),(0,o.jsx)(j.Flex,{className:D()(r.sectionFields,{[r.sectionFieldsWithoutBorder]:!a}),gap:"extra-small",vertical:!0,children:i.map((t,i)=>{let h=e.key===t.Field.fieldBreadcrumbTitle,b=e.fieldKeys.includes(t.Field.name);return h&&b&&(0,o.jsx)(T.AutoHideEmptyContent,{contentSelector:`.${r.objectSectionFieldItemContent}`,children:(0,o.jsx)("div",{children:(0,o.jsx)(j.Flex,{gap:"mini",children:$.map((e,i)=>{var h;let b=null==t?void 0:t.isDifferent,g=0===i,x=1===i,v=0===i?p.main:p.target,y=null==c||null==(h=c[v])?void 0:h.id,S=E.includes(t.Field.fieldtype),w=(b||t.isTouched)&&S&&(0,s.isEmptyValue)(t[e]);return(0,o.jsxs)(j.Flex,{className:r.objectSectionFieldItemWrapper,gap:"mini",vertical:!0,children:[(0,o.jsx)("div",{children:(e=>{let{fieldItem:t,isCommonSection:i,isMainVersion:l,isCompareVersion:a}=e,c=t.Field.title,u=t.Field.locale;if((0,s.isEmptyValue)(c))return(0,o.jsx)(o.Fragment,{});let p=i?n(`version.${c}`):n(c);return(0,o.jsx)("div",{className:r.fieldTitle,children:(0,o.jsxs)(j.Flex,{align:"center",className:r.fieldTitleContent,justify:"space-between",children:[l&&(0,o.jsxs)(j.Text,{children:[p," ",!(0,d.isEmpty)(u)&&(0,o.jsxs)(j.Text,{type:"secondary",children:["| ",u.toUpperCase()]})]}),!i&&l&&t.isDifferent&&(0,o.jsx)(j.IconButton,{icon:{value:"arrow-square-right"},onClick:()=>{m((null==t?void 0:t.fieldPath)??"")},size:"small"}),!i&&l&&!t.isDifferent&&!t.isTouched&&(0,o.jsx)(j.IconButton,{disabled:!0,icon:{value:"lock"},size:"small"}),!i&&a&&t.isTouched&&(0,o.jsx)(j.IconButton,{danger:!0,icon:{value:"corner-up-left"},onClick:()=>{f((null==t?void 0:t.fieldPath)??"")},size:"small"})]})})})({fieldItem:t,isCommonSection:a,isMainVersion:g,isCompareVersion:x})}),(0,o.jsxs)("div",{className:r.objectSectionFieldItemContent,children:[w&&(0,o.jsx)(j.Flex,{align:"center",className:D()(r.objectSectionFieldItem,r.objectSectionEmptyState,{[r.objectSectionEmptyStateDisabled]:g,[r.objectSectionEmptyStateHighlight]:x&&b}),justify:"center",children:n("compare_objects.empty")}),(0,o.jsx)(u.DataObjectProvider,{id:y,children:(0,o.jsx)(B.FieldCollectionProvider,{id:y,children:(0,o.jsx)(u.DataComponent,{className:D()(r.objectSectionFieldItem,"versionFieldItem",{[r.objectSectionFieldItemHighlight]:b&&x&&!a,versionFieldItemHighlight:b&&x&&!a}),datatype:"data",fieldCollectionModifiedList:null==t?void 0:t.fieldCollectionModifiedList,fieldType:t.Field.fieldtype,isExpandedUnmodifiedFields:l,...t.Field,name:t.Field.name,value:t[e]},`${t.fieldPath}-${t.isTouched}-${e}`)},`${y}-${t.fieldPath}-${t.isTouched}-${e}`)},`${y}-${t.fieldPath}-${t.isTouched}-${e}`)]})]},`${i}-${e}`)})})})},`${i}-${t.Field.name}`)})})]},`${t}-${e.key}`)})})},k=()=>{let e,{t}=(0,a.useTranslation)(),{styles:i}=C(),{selectedMergerObjects:l,canCompare:n,mergerFields:s,isLoading:c,roles:u}=x(),{openElement:p}=(0,B.useElementHelper)(),[m,f]=(0,r.useState)(!1),h=(0,r.useMemo)(()=>s.filter(e=>!(0,d.isEqual)((null==e?void 0:e.main)??null,(null==e?void 0:e.target)??null)||e.isTouched),[s]),b=(0,r.useMemo)(()=>m?s:h,[m,s,h]),g=(0,r.useMemo)(()=>{let e;return e={},s.forEach(t=>{let i=t.Field.fieldBreadcrumbTitle??"systemData";w.includes(t.Field.fieldtype)||((0,d.isUndefined)(e[i])&&(e[i]=new Set),e[i].add(t.Field.name))}),Object.entries(e).map(e=>{let[t,i]=e;return{key:t,fieldKeys:Array.from(i)}})},[s]),v=(0,r.useMemo)(()=>(e=>{let{data:t,breadcrumbsList:i}=e,l=(0,d.map)(t,"Field.name"),n=(0,d.map)(t,"Field.fieldBreadcrumbTitle");return(0,d.isEmpty)(i)?[]:(0,d.filter)((0,d.map)(i,e=>({...e,fieldKeys:(0,d.intersection)(e.fieldKeys,l)})),e=>!(0,d.isEmpty)(e.fieldKeys)&&n.includes(e.key))})({data:b,breadcrumbsList:g}),[b,g]),y=(0,r.useMemo)(()=>(0,d.isEmpty)(h)?[]:h.map(e=>e.Field.title),[h]),S=!(0,d.isUndefined)(y)&&y.length>0;return(0,o.jsxs)(j.Content,{centered:!n,loading:c,padded:!0,padding:{x:"small",y:"extra-small"},children:[!n&&(0,o.jsx)(j.Text,{type:"secondary",children:t("compare_objects.initial_description")}),n&&!(0,d.isEmpty)(b)&&(0,o.jsxs)(j.Flex,{vertical:!0,children:[(0,o.jsx)(j.Flex,{className:i.headerContainer,wrap:"wrap",children:(e=[u.main,u.target],(0,o.jsx)(o.Fragment,{children:e.map(e=>{let t=l[e];return(0,o.jsxs)(j.Flex,{align:"center",className:i.headerItem,justify:"space-between",children:[(0,o.jsxs)(j.Text,{strong:!0,children:[null==t?void 0:t.fullPath," (id:",null==t?void 0:t.id,")"]}),(0,o.jsx)(j.IconButton,{icon:{value:"open-folder"},onClick:()=>{p({id:Number(null==t?void 0:t.id),type:"data-object"})},type:"link"})]},`${e}-${null==t?void 0:t.id}`)})}))}),(0,o.jsxs)(j.Flex,{className:i.content,vertical:!0,children:[(0,o.jsx)("div",{className:i.switchContainer,children:(0,o.jsx)(j.Switch,{labelLeft:(0,o.jsx)(j.Text,{children:t("compare_objects.expand_unmodified_fields")}),onChange:()=>{f(!m)},value:m})}),!S&&!m&&(0,o.jsx)(j.Flex,{justify:"center",children:(0,o.jsx)(j.Text,{className:i.emptyState,children:t("compare_objects.no_difference")})}),(0,o.jsx)(I,{breadcrumbsList:v,isExpandedUnmodifiedFields:m,mergerData:b})]})]})]})},P=e=>{let{isFetching:t,refetch:i}=e;return t?(0,o.jsx)(j.Box,{padding:{x:"extra-small",y:"extra-small"},children:(0,o.jsx)(j.Spin,{})}):(0,o.jsx)(j.IconButton,{icon:{value:"refresh"},onClick:async()=>{i()}})},A=()=>{let{t:e}=(0,a.useTranslation)(),{canCompare:t,mergerFields:i,refetch:l,isFetching:n,touchedFields:r,mirror:s,applyAll:c,resetAll:u,save:p,isSaving:m,hasUnsavedChanges:f,canSaveTarget:h}=x();return!t||(0,d.isEmpty)(i)?(0,o.jsx)(o.Fragment,{}):(0,o.jsxs)(j.Toolbar,{justify:"space-between",children:[(0,o.jsxs)(j.Split,{size:"extra-small",children:[(0,o.jsx)(P,{isFetching:n,refetch:l}),(0,o.jsxs)(j.Flex,{gap:"extra-small",children:[(0,o.jsx)(j.IconTextButton,{icon:{value:"contrast-01"},onClick:s,children:e("compare_objects.toolbar.mirror_view")}),(0,o.jsx)(j.Tooltip,{title:e("compare_objects.toolbar.apply_all.description"),children:(0,o.jsx)(j.IconTextButton,{icon:{value:"corner-up-left"},onClick:c,children:e("compare_objects.toolbar.apply_all")})})]})]}),(0,o.jsxs)(j.Flex,{gap:"extra-small",children:[(0,o.jsx)(j.IconTextButton,{disabled:(0,d.isEmpty)(r),icon:{value:"corner-up-left"},onClick:u,children:e("compare_objects.toolbar.reset")}),(0,o.jsx)(j.Tooltip,{title:h?"":e("compare_objects.toolbar.save.no_permission"),children:(0,o.jsx)(j.Button,{disabled:!f||!h,loading:m,onClick:p,type:"primary",children:e("compare_objects.toolbar.save")})})]})]})},O=()=>(0,o.jsx)(j.ContentLayout,{renderToolbar:(0,o.jsx)(A,{}),renderTopBar:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(S,{}),(0,o.jsx)(j.Divider,{size:"none",theme:"secondary"})]}),children:(0,o.jsx)(k,{})}),M=()=>(0,o.jsx)(g,{children:(0,o.jsx)(O,{})}),N={onInit:()=>{l.container.get(a.serviceIds.mainNavRegistry).registerMainNavItem({path:"DataManagement/Compare Objects",label:"compare_objects.nav.compare_objects",order:500,permission:n.UserPermission.Objects,widgetConfig:{name:"ObjectMergerPage",id:"object-merger-page",component:"object-merger-page",config:{translationKey:"compare_objects.nav.compare_objects",icon:{type:"name",value:"compare"}}}}),l.container.get(a.serviceIds.widgetManager).registerWidget({name:"object-merger-page",component:M})}};void 0!==(e=i.hmd(e)).hot&&e.hot.accept();let R={name:"object-merger-plugin",onInit:e=>{let{container:t}=e},onStartup:e=>{let{moduleSystem:t}=e;t.registerModule(N),console.log("Hello from object merger bundle.")}}},6942(e){!function(){"use strict";var t={}.hasOwnProperty;function i(){for(var e="",n=0;n<arguments.length;n++){var a=arguments[n];a&&(e=l(e,function(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return i.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var n="";for(var a in e)t.call(e,a)&&e[a]&&(n=l(n,a));return n}(a)))}return e}function l(e,t){return t?e?e+" "+t:e+t:e}e.exports?(i.default=i,e.exports=i):"function"==typeof define&&"object"==typeof define.amd&&define.amd?define("classnames",[],function(){return i}):window.classNames=i}()}}]);