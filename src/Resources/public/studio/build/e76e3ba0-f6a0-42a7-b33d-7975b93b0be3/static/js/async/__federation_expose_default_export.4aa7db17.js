/*! For license information please see __federation_expose_default_export.4aa7db17.js.LICENSE.txt */
(self.webpackChunkpimcore_objectmerger_bundle=self.webpackChunkpimcore_objectmerger_bundle||[]).push([["525"],{20(e,t,i){"use strict";var l=i(798),n=Symbol.for("react.element"),a=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,o=l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function s(e,t,i){var l,a={},s=null,c=null;for(l in void 0!==i&&(s=""+i),void 0!==t.key&&(s=""+t.key),void 0!==t.ref&&(c=t.ref),t)r.call(t,l)&&!d.hasOwnProperty(l)&&(a[l]=t[l]);if(e&&e.defaultProps)for(l in t=e.defaultProps)void 0===a[l]&&(a[l]=t[l]);return{$$typeof:n,type:e,key:s,ref:c,props:a,_owner:o.current}}t.Fragment=a,t.jsx=s,t.jsxs=s},848(e,t,i){"use strict";e.exports=i(20)},390(e,t,i){"use strict";i.r(t),i.d(t,{ObjectMergerPlugin:()=>U});var l=i(977),n=i(972),a=i(781),r=i(848),o=i(798),d=i(471),s=i(267),c=i(161);let u=(e,t)=>[e,t].filter(Boolean).join("/"),p=["block"],m=async e=>{let t,{objectId:i,layout:l,objectData:n,objectDataRegistry:a,layoutsList:r,setLayoutsList:o}=e,c={fullPath:(null==n?void 0:n.fullPath)??"",creationDate:(0,s.formatDateTime)({timestamp:(null==n?void 0:n.creationDate)??null,dateStyle:"short",timeStyle:"medium"}),modificationDate:(0,s.formatDateTime)({timestamp:(null==n?void 0:n.modificationDate)??null,dateStyle:"short",timeStyle:"medium"})},m=async e=>{let{data:t,objectValuesData:l=null==n?void 0:n.objectData,fieldBreadcrumbTitle:c="",fieldPath:f=""}=e,h=t.map(async e=>{if("layout"===e.datatype){let t=u(c,e.title);return await m({data:e.children,fieldBreadcrumbTitle:t,objectValuesData:l,fieldPath:f})}if("data"===e.datatype){let t=e.name,n=(0,d.get)(l,t),h=e.fieldtype,b=(0,s.isEmptyValue)(f)?t:`${f}.${t}`;if(!a.hasDynamicType(h))return[];let x=a.getDynamicType(h),g=await x.processVersionFieldData({objectId:i,item:e,fieldBreadcrumbTitle:c,fieldValueByName:n,fieldPath:b,layoutsList:r,setLayoutsList:o,versionId:i,versionCount:1}),j=null==g?void 0:g.map(async e=>{var t,i,n,a;if(l={},!(0,d.isEmpty)(null==e||null==(t=e.fieldData)?void 0:t.children)&&!p.includes(String((null==e||null==(i=e.fieldData)?void 0:i.fieldtype)??""))){let t=u(c,String((null==e||null==(n=e.fieldData)?void 0:n.title)??""));return await m({data:[null==e?void 0:e.fieldData],objectValuesData:{...l,[null==e||null==(a=e.fieldData)?void 0:a.name]:null==e?void 0:e.fieldValue},fieldBreadcrumbTitle:t,fieldPath:(null==e?void 0:e.fieldPath)??""})}return[e]});return(await Promise.all(j)).reduce((e,t)=>e.concat(t),[])}return[]});return(await Promise.all(h)).reduce((e,t)=>e.concat(t),[])},f=await m({data:l});return[...(t=[],Object.entries(c).forEach(e=>{let[i,l]=e;t.push({fieldBreadcrumbTitle:"systemData",fieldData:{title:i,name:i,fieldtype:"input"},fieldValue:l})}),t),...f]},f=e=>{var t,i;let l=e.fieldBreadcrumbTitle??"",n=(null==(t=e.fieldData)?void 0:t.name)??"",a=(null==(i=e.fieldData)?void 0:i.locale)??"default";return`${l}-${n}-${a}`},h=(0,o.createContext)(void 0),b=e=>{let{children:t}=e,[i,l]=(0,o.useState)({A:void 0,B:void 0}),n=(e=>{let{selectedMergerObjects:t,objectDataRegistry:i}=e,l=(0,a.useAppDispatch)(),[n,r]=(0,o.useState)(!1),[u,p]=(0,o.useState)(!1),[h,b]=(0,o.useState)({main:"A",target:"B"}),[x,g]=(0,o.useState)(new Set),[j,v]=(0,o.useState)([]),[y,S]=(0,o.useState)([]),[w,B]=(0,o.useState)([]),[F,D]=(0,o.useState)(!1),[T,$]=(0,o.useState)(!1),[C,k]=(0,o.useState)({A:null,B:null}),[E,I]=(0,o.useState)({A:null,B:null}),[_,P]=(0,o.useState)({A:null,B:null}),O=async()=>{if(!((0,d.isUndefined)(t.A)||(0,d.isUndefined)(t.B))){r(!0),v([]),S([]),g(new Set);try{var e,n,a,o,s,u;let[p,f,h,b]=await Promise.all([l(c.api.endpoints.dataObjectGetLayoutById.initiate({id:null==t||null==(e=t.A)?void 0:e.id},{forceRefetch:!0})).unwrap(),l(c.api.endpoints.dataObjectGetById.initiate({id:null==t||null==(n=t.A)?void 0:n.id},{forceRefetch:!0})).unwrap(),l(c.api.endpoints.dataObjectGetLayoutById.initiate({id:null==t||null==(a=t.B)?void 0:a.id},{forceRefetch:!0})).unwrap(),l(c.api.endpoints.dataObjectGetById.initiate({id:null==t||null==(o=t.B)?void 0:o.id},{forceRefetch:!0})).unwrap()]);if((null==f?void 0:f.className)!==(null==b?void 0:b.className)){D(!1),$(!1),r(!1);return}let x=await m({objectId:null==t||null==(s=t.A)?void 0:s.id,layout:(null==p?void 0:p.children)??[],objectData:f??{},objectDataRegistry:i,layoutsList:w,setLayoutsList:B}),g=await m({objectId:null==t||null==(u=t.B)?void 0:u.id,layout:(null==h?void 0:h.children)??[],objectData:b??{},objectDataRegistry:i,layoutsList:w,setLayoutsList:B});v(x),S(g);let j=(null==f?void 0:f.objectData)??{},y=(null==b?void 0:b.objectData)??{};k({A:j,B:y}),I({A:(0,d.cloneDeep)(j),B:(0,d.cloneDeep)(y)}),P({A:(0,d.cloneDeep)(j),B:(0,d.cloneDeep)(y)}),$(!0)}catch(e){console.error("Failed to load merger data",e)}finally{r(!1)}}},A=(0,o.useMemo)(()=>(0,d.isEmpty)(j)||(0,d.isEmpty)(y)?[]:((e,t,i,l,n)=>{let a=[],r=new Map(e.map(e=>[f(e),e])),o=new Map(t.map(e=>[f(e),e]));for(let e of new Set([...r.keys(),...o.keys()])){var s,c;let t=r.get(e),u=o.get(e),p="A"===i.main?t:u,m="B"===i.target?u:t,f="B"===i.main?(0,d.get)(n.B,(null==u?void 0:u.fieldPath)??""):(0,d.get)(n.A,(null==t?void 0:t.fieldPath)??""),h="B"===i.target?(0,d.get)(n.B,(null==u?void 0:u.fieldPath)??""):(0,d.get)(n.A,(null==t?void 0:t.fieldPath)??""),b=(0,d.isUndefined)(f)?(null==p?void 0:p.fieldValue)??null:f,x=(0,d.isUndefined)(h)?(null==m?void 0:m.fieldValue)??null:h,g=(null==p?void 0:p.fieldPath)??(null==m?void 0:m.fieldPath)??(null==p||null==(s=p.fieldData)?void 0:s.name)??(null==m||null==(c=m.fieldData)?void 0:c.name),j={Field:{fieldBreadcrumbTitle:(null==p?void 0:p.fieldBreadcrumbTitle)??(null==m?void 0:m.fieldBreadcrumbTitle),...(null==p?void 0:p.fieldData)??(null==m?void 0:m.fieldData)},main:b,target:x,isTouched:l.has(g),isDifferent:!(0,d.isEqual)(b,x),fieldPath:(null==p?void 0:p.fieldPath)??(null==m?void 0:m.fieldPath)};if("fieldcollections"===j.Field.fieldtype){let e=(null==b?void 0:b.length)??0,i=(null==x?void 0:x.length)??0,l=i>e?u:t,n=e<i?t:u;j.fieldCollectionModifiedList=(0,d.differenceWith)((null==l?void 0:l.fieldValue)??[],(null==n?void 0:n.fieldValue)??[],(e,t)=>(null==e?void 0:e.type)===(null==t?void 0:t.type)&&(0,d.isEqual)(null==e?void 0:e.data,null==t?void 0:t.data)).map(e=>e.type)}a.push(j)}return a})(j,y,h,x,_),[j,y,h,x,_]),N=(0,o.useMemo)(()=>{let e=h.target;return!(0,d.isEqual)(_[e],E[e])},[_,E,h]),M=(0,o.useCallback)(e=>{let t=h.main,i=h.target,l=(0,d.get)(_[t],e),n=(0,d.isUndefined)(l)?null:l;P(t=>{let l=(0,d.cloneDeep)(t);return(0,d.setWith)(l[i],e,n,Object),l}),g(t=>new Set([...t,e]))},[h,_]),U=(0,o.useCallback)(()=>{let e="A"===h.main?j:y,t="B"===h.target?y:j,i=h.main,l=h.target,n=new Set,a=(0,d.cloneDeep)(_[l]);((null==e?void 0:e.length)>(null==t?void 0:t.length)?e:t).forEach(l=>{let r=e.find(e=>e.fieldPath===l.fieldPath),o=t.find(e=>e.fieldPath===l.fieldPath);if(!(0,d.isEqual)(null==r?void 0:r.fieldValue,null==o?void 0:o.fieldValue)){let e=(0,s.isEmptyValue)(null==l?void 0:l.fieldPath)?null==l?void 0:l.fieldData.name:null==l?void 0:l.fieldPath,t=(0,d.get)(_[i],e),r=(0,d.isUndefined)(t)?null:t;(0,d.setWith)(a,e,r,Object),n.add(e)}}),P(e=>({...e,[l]:a})),g(e=>new Set([...e,...n]))},[j,y,h,_]),R=(0,o.useCallback)(e=>{let t=h.target,i=(0,d.get)(C[t],e);P(l=>{let n=(0,d.cloneDeep)(l);return null!==n[t]&&(0,d.setWith)(n[t],e,i,Object),n}),g(t=>{let i=new Set(t);return i.delete(e),i})},[h,C]),V=(0,o.useCallback)(()=>{let e=h.target;P(t=>({...t,[e]:(0,d.cloneDeep)(C[e])})),g(new Set)},[h,C]),W=(0,o.useCallback)(async()=>{let e=h.target,i={},n=_[e],a=E[e];if(("A"===e?j:y).forEach(e=>{let t=(0,s.isEmptyValue)(e.fieldPath)?e.fieldData.name:e.fieldPath,l=(0,d.get)(n,t),r=(0,d.get)(a,t);(0,d.isEqual)(l,r)||(0,d.setWith)(i,t,l,Object)}),!(0,d.isEmpty)(i)){p(!0);try{var r;await l(c.api.endpoints.dataObjectPatchById.initiate({body:{data:[{id:null==t||null==(r=t[e])?void 0:r.id,task:"save",editableData:i}]}})).unwrap()}catch(e){console.error("Failed to save object",e)}finally{I(t=>({...t,[e]:(0,d.cloneDeep)(_[e])})),p(!1)}}},[h,_,C,x,t,l]);return{loadLayoutData:O,refetch:()=>{O()},isFetching:n,isLoading:n,isSaving:u,mergerFields:A,roles:h,touchedFields:x,copyFieldToTarget:M,applyAll:U,resetField:R,resetAll:V,mirror:()=>{b(e=>({main:e.target,target:e.main})),P({A:(0,d.cloneDeep)(C.A),B:(0,d.cloneDeep)(C.B)}),g(new Set)},save:W,versions:_,initialVersions:C,isSameObjectType:F,setIsSameObjectType:D,canCompare:T,setCanCompare:$,hasUnsavedChanges:N}})({selectedMergerObjects:i,objectDataRegistry:(0,a.useInjection)(a.serviceIds["DynamicTypes/ObjectDataRegistry"])}),{setCanCompare:u,setIsSameObjectType:p}=n;(0,o.useEffect)(()=>{let e=!(0,d.isUndefined)(null==i?void 0:i.A)&&!(0,d.isUndefined)(null==i?void 0:i.B);p(!0),u(e)},[null==i?void 0:i.A,null==i?void 0:i.B]);let b=(0,o.useMemo)(()=>({...n,selectedMergerObjects:i,setSelectedMergerObjects:l}),[n,i,l]);return(0,r.jsx)(h.Provider,{value:b,children:t})},x=()=>{let e=(0,o.useContext)(h);if((0,d.isUndefined)(e))throw Error("useObjectMergerContext must be used within a ObjectMergerProvider");return e};var g=i(696),j=i(432);let v=(0,j.createStyles)(e=>{let{token:t,css:i}=e;return{formWrapper:i`
      min-width: 400px;
    `}}),y=()=>{let{t:e}=(0,a.useTranslation)(),{styles:t}=v(),{selectedMergerObjects:i,setSelectedMergerObjects:l,loadLayoutData:n,isLoading:o,canCompare:s,isSameObjectType:c}=x(),u=!(0,d.isUndefined)(null==i?void 0:i.A)&&!(0,d.isUndefined)(null==i?void 0:i.B)&&!c;return(0,r.jsx)(g.Content,{padded:!0,padding:{x:"small",y:"extra-small"},children:(0,r.jsxs)(g.Flex,{gap:"extra-small",vertical:!0,children:[(0,r.jsx)(g.Title,{children:e("compare_objects.title")}),(0,r.jsxs)(g.Flex,{align:"flex-end",gap:"extra-small",children:[(0,r.jsx)("div",{className:t.formWrapper,children:(0,r.jsxs)(g.FormKit,{children:[(0,r.jsx)(g.Form.Item,{name:"mainObject",children:(0,r.jsx)(g.ManyToOneRelationInput,{dataObjectsAllowed:!0,enableSearch:!0,onChange:e=>{l({A:e,B:null==i?void 0:i.B})},value:null==i?void 0:i.A})}),(0,r.jsx)(g.Form.Item,{name:"compareObject",children:(0,r.jsx)(g.ManyToOneRelationInput,{dataObjectsAllowed:!0,enableSearch:!0,onChange:e=>{l({A:null==i?void 0:i.A,B:e})},value:null==i?void 0:i.B})})]})}),(0,r.jsx)(g.Button,{disabled:!s,loading:o,onClick:()=>{n()},type:"primary",children:e("compare_objects.form.compare_btn")})]}),u&&(0,r.jsx)(g.Alert,{message:e("compare_objects.form.error.different_object_types"),type:"error"})]})})};var S=i(842);let w=["reverseObjectRelation"];var B=i(942),F=i.n(B),D=i(90),T=i(703);let $=["main","target"],C=(0,j.createStyles)(e=>{let{token:t,css:i}=e;return{headerContainer:i`
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
    `}}),k=["systemData"],E=["block","fieldcollections"],I=e=>{let{breadcrumbsList:t,mergerData:i,isExpandedUnmodifiedFields:l}=e,{t:n}=(0,a.useTranslation)(),{styles:o}=C(),{selectedMergerObjects:c,roles:u,copyFieldToTarget:p,resetField:m}=x();return(0,r.jsx)(r.Fragment,{children:null==t?void 0:t.map((e,t)=>{let a="systemData"===e.key;return(0,r.jsxs)("div",{children:[(e=>{let{key:t,isCommonSection:i}=e,l=k.includes(t),a=(l?n(`version.category.title.${t}`):t).split("/"),[d,...c]=l?a:a.map(e=>n(e)),u=c.length>0?` | ${c.join(" | ")}`:"";return(0,s.isEmptyValue)(d)&&(0,s.isEmptyValue)(u)?null:(0,r.jsxs)(g.Text,{className:F()(o.sectionTitle,{[o.subSectionTitle]:!i}),strong:!0,children:[d,!(0,s.isEmptyValue)(u)&&(0,r.jsx)("span",{className:o.subSectionText,children:u})]})})({key:e.key,isCommonSection:a}),(0,r.jsx)(g.Flex,{className:F()(o.sectionFields,{[o.sectionFieldsWithoutBorder]:!a}),gap:"extra-small",vertical:!0,children:i.map((t,i)=>{let f=e.key===t.Field.fieldBreadcrumbTitle,h=e.fieldKeys.includes(t.Field.name);return f&&h&&(0,r.jsx)(T.AutoHideEmptyContent,{contentSelector:`.${o.objectSectionFieldItemContent}`,children:(0,r.jsx)("div",{children:(0,r.jsx)(g.Flex,{gap:"mini",children:$.map((e,i)=>{var f;let h=null==t?void 0:t.isDifferent,b=0===i,x=1===i,j=0===i?u.main:u.target,v=null==c||null==(f=c[j])?void 0:f.id,y=E.includes(t.Field.fieldtype),w=(h||t.isTouched)&&y&&(0,s.isEmptyValue)(t[e]);return(0,r.jsxs)(g.Flex,{className:o.objectSectionFieldItemWrapper,gap:"mini",vertical:!0,children:[(0,r.jsx)("div",{children:(e=>{let{fieldItem:t,isCommonSection:i,isMainVersion:l,isCompareVersion:a}=e,c=t.Field.title,u=t.Field.locale;if((0,s.isEmptyValue)(c))return(0,r.jsx)(r.Fragment,{});let f=i?n(`version.${c}`):n(c);return(0,r.jsx)("div",{className:o.fieldTitle,children:(0,r.jsxs)(g.Flex,{align:"center",className:o.fieldTitleContent,justify:"space-between",children:[l&&(0,r.jsxs)(g.Text,{children:[f," ",!(0,d.isEmpty)(u)&&(0,r.jsxs)(g.Text,{type:"secondary",children:["| ",u.toUpperCase()]})]}),!i&&l&&t.isDifferent&&(0,r.jsx)(g.IconButton,{icon:{value:"arrow-square-right"},onClick:()=>{p((null==t?void 0:t.fieldPath)??"")},size:"small"}),!i&&l&&!t.isDifferent&&!t.isTouched&&(0,r.jsx)(g.IconButton,{disabled:!0,icon:{value:"lock"},size:"small"}),!i&&a&&t.isTouched&&(0,r.jsx)(g.IconButton,{danger:!0,icon:{value:"corner-up-left"},onClick:()=>{m((null==t?void 0:t.fieldPath)??"")},size:"small"})]})})})({fieldItem:t,isCommonSection:a,isMainVersion:b,isCompareVersion:x})}),(0,r.jsxs)("div",{className:o.objectSectionFieldItemContent,children:[w&&(0,r.jsx)(g.Flex,{align:"center",className:F()(o.objectSectionFieldItem,o.objectSectionEmptyState,{[o.objectSectionEmptyStateDisabled]:b,[o.objectSectionEmptyStateHighlight]:x&&h}),justify:"center",children:n("compare_objects.empty")}),(0,r.jsx)(D.DataObjectProvider,{id:v,children:(0,r.jsx)(S.FieldCollectionProvider,{id:v,children:(0,r.jsx)(D.DataComponent,{className:F()(o.objectSectionFieldItem,"versionFieldItem",{[o.objectSectionFieldItemHighlight]:h&&x&&!a,versionFieldItemHighlight:h&&x&&!a}),datatype:"data",fieldCollectionModifiedList:null==t?void 0:t.fieldCollectionModifiedList,fieldType:t.Field.fieldtype,isExpandedUnmodifiedFields:l,...t.Field,name:t.Field.name,value:t[e]},`${t.fieldPath}-${t.isTouched}-${e}`)},`${v}-${t.fieldPath}-${t.isTouched}-${e}`)},`${v}-${t.fieldPath}-${t.isTouched}-${e}`)]})]},`${i}-${e}`)})})})},`${i}-${t.Field.name}`)})})]},`${t}-${e.key}`)})})},_=()=>{let e,{t}=(0,a.useTranslation)(),{styles:i}=C(),{selectedMergerObjects:l,canCompare:n,mergerFields:s,isLoading:c,roles:u}=x(),{openElement:p}=(0,S.useElementHelper)(),[m,f]=(0,o.useState)(!1),h=(0,o.useMemo)(()=>s.filter(e=>!(0,d.isEqual)((null==e?void 0:e.main)??null,(null==e?void 0:e.target)??null)||e.isTouched),[s]),b=(0,o.useMemo)(()=>m?s:h,[m,s,h]),j=(0,o.useMemo)(()=>{let e;return e={},s.forEach(t=>{let i=t.Field.fieldBreadcrumbTitle??"systemData";w.includes(t.Field.fieldtype)||((0,d.isUndefined)(e[i])&&(e[i]=new Set),e[i].add(t.Field.name))}),Object.entries(e).map(e=>{let[t,i]=e;return{key:t,fieldKeys:Array.from(i)}})},[s]),v=(0,o.useMemo)(()=>(e=>{let{data:t,breadcrumbsList:i}=e,l=(0,d.map)(t,"Field.name"),n=(0,d.map)(t,"Field.fieldBreadcrumbTitle");return(0,d.isEmpty)(i)?[]:(0,d.filter)((0,d.map)(i,e=>({...e,fieldKeys:(0,d.intersection)(e.fieldKeys,l)})),e=>!(0,d.isEmpty)(e.fieldKeys)&&n.includes(e.key))})({data:b,breadcrumbsList:j}),[b,j]),y=(0,o.useMemo)(()=>(0,d.isEmpty)(h)?[]:h.map(e=>e.Field.title),[h]),B=!(0,d.isUndefined)(y)&&y.length>0;return(0,r.jsxs)(g.Content,{centered:!n,loading:c,padded:!0,padding:{x:"small",y:"extra-small"},children:[!n&&(0,r.jsx)(g.Text,{type:"secondary",children:t("compare_objects.initial_description")}),n&&!(0,d.isEmpty)(b)&&(0,r.jsxs)(g.Flex,{vertical:!0,children:[(0,r.jsx)(g.Flex,{className:i.headerContainer,wrap:"wrap",children:(e=[u.main,u.target],(0,r.jsx)(r.Fragment,{children:e.map(e=>{let t=l[e];return(0,r.jsxs)(g.Flex,{align:"center",className:i.headerItem,justify:"space-between",children:[(0,r.jsxs)(g.Text,{strong:!0,children:[null==t?void 0:t.fullPath," (id:",null==t?void 0:t.id,")"]}),(0,r.jsx)(g.IconButton,{icon:{value:"open-folder"},onClick:()=>{p({id:Number(null==t?void 0:t.id),type:"data-object"})},type:"link"})]},`${e}-${null==t?void 0:t.id}`)})}))}),(0,r.jsxs)(g.Flex,{className:i.content,vertical:!0,children:[(0,r.jsx)("div",{className:i.switchContainer,children:(0,r.jsx)(g.Switch,{labelLeft:(0,r.jsx)(g.Text,{children:t("compare_objects.expand_unmodified_fields")}),onChange:()=>{f(!m)},value:m})}),!B&&!m&&(0,r.jsx)(g.Flex,{justify:"center",children:(0,r.jsx)(g.Text,{className:i.emptyState,children:t("compare_objects.no_difference")})}),(0,r.jsx)(I,{breadcrumbsList:v,isExpandedUnmodifiedFields:m,mergerData:b})]})]})]})},P=e=>{let{isFetching:t,refetch:i}=e;return t?(0,r.jsx)(g.Box,{padding:{x:"extra-small",y:"extra-small"},children:(0,r.jsx)(g.Spin,{})}):(0,r.jsx)(g.IconButton,{icon:{value:"refresh"},onClick:async()=>{i()}})},O=()=>{let{t:e}=(0,a.useTranslation)(),{canCompare:t,mergerFields:i,refetch:l,isFetching:n,touchedFields:o,mirror:s,applyAll:c,resetAll:u,save:p,isSaving:m,hasUnsavedChanges:f}=x();return!t||(0,d.isEmpty)(i)?(0,r.jsx)(r.Fragment,{}):(0,r.jsxs)(g.Toolbar,{justify:"space-between",children:[(0,r.jsxs)(g.Split,{size:"extra-small",children:[(0,r.jsx)(P,{isFetching:n,refetch:l}),(0,r.jsxs)(g.Flex,{gap:"extra-small",children:[(0,r.jsx)(g.IconTextButton,{icon:{value:"contrast-01"},onClick:s,children:e("compare_objects.toolbar.mirror_view")}),(0,r.jsx)(g.Tooltip,{title:e("compare_objects.toolbar.apply_all.description"),children:(0,r.jsx)(g.IconTextButton,{icon:{value:"corner-up-left"},onClick:c,children:e("compare_objects.toolbar.apply_all")})})]})]}),(0,r.jsxs)(g.Flex,{gap:"extra-small",children:[(0,r.jsx)(g.IconTextButton,{disabled:(0,d.isEmpty)(o),icon:{value:"corner-up-left"},onClick:u,children:e("compare_objects.toolbar.reset")}),(0,r.jsx)(g.Button,{disabled:!f,loading:m,onClick:p,type:"primary",children:e("compare_objects.toolbar.save")})]})]})},A=()=>(0,r.jsx)(g.ContentLayout,{renderToolbar:(0,r.jsx)(O,{}),renderTopBar:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(y,{}),(0,r.jsx)(g.Divider,{size:"none",theme:"secondary"})]}),children:(0,r.jsx)(_,{})}),N=()=>(0,r.jsx)(b,{children:(0,r.jsx)(A,{})}),M={onInit:()=>{l.container.get(a.serviceIds.mainNavRegistry).registerMainNavItem({path:"DataManagement/Compare Objects",label:"compare_objects.nav.compare_objects",order:500,permission:n.UserPermission.Objects,widgetConfig:{name:"ObjectMergerPage",id:"object-merger-page",component:"object-merger-page",config:{translationKey:"compare_objects.nav.compare_objects",icon:{type:"name",value:"compare"}}}}),l.container.get(a.serviceIds.widgetManager).registerWidget({name:"object-merger-page",component:N})}};void 0!==(e=i.hmd(e)).hot&&e.hot.accept();let U={name:"object-merger-plugin",onInit:e=>{let{container:t}=e},onStartup:e=>{let{moduleSystem:t}=e;t.registerModule(M),console.log("Hello from object merger bundle.")}}},942(e){!function(){"use strict";var t={}.hasOwnProperty;function i(){for(var e="",n=0;n<arguments.length;n++){var a=arguments[n];a&&(e=l(e,function(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return i.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var n="";for(var a in e)t.call(e,a)&&e[a]&&(n=l(n,a));return n}(a)))}return e}function l(e,t){return t?e?e+" "+t:e+t:e}e.exports?(i.default=i,e.exports=i):"function"==typeof define&&"object"==typeof define.amd&&define.amd?define("classnames",[],function(){return i}):window.classNames=i}()}}]);