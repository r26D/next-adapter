var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.default=exports.Document=void 0;exports.getInitialProps=getInitialProps;exports.style=void 0;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _document=_interopRequireWildcard(require("next/document"));var React=_interopRequireWildcard(require("react"));var _reactNative=require("react-native");function _getRequireWildcardCache(nodeInterop){if(typeof WeakMap!=="function")return null;var cacheBabelInterop=new WeakMap();var cacheNodeInterop=new WeakMap();return(_getRequireWildcardCache=function _getRequireWildcardCache(nodeInterop){return nodeInterop?cacheNodeInterop:cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj,nodeInterop){if(!nodeInterop&&obj&&obj.__esModule){return obj;}if(obj===null||typeof obj!=="object"&&typeof obj!=="function"){return{default:obj};}var cache=_getRequireWildcardCache(nodeInterop);if(cache&&cache.has(obj)){return cache.get(obj);}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(key!=="default"&&Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}newObj.default=obj;if(cache){cache.set(obj,newObj);}return newObj;}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=(0,_getPrototypeOf2.default)(Derived),result;if(hasNativeReflectConstruct){var NewTarget=(0,_getPrototypeOf2.default)(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else{result=Super.apply(this,arguments);}return(0,_possibleConstructorReturn2.default)(this,result);};}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true;}catch(e){return false;}}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;})),keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach(function(key){(0,_defineProperty2.default)(target,key,source[key]);}):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}return target;}var style="\n/**\n * Building on the RNWeb reset:\n * https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/StyleSheet/initialRules.js\n */\nhtml, body, #__next {\n  width: 100%;\n  /* To smooth any scrolling behavior */\n  -webkit-overflow-scrolling: touch;\n  margin: 0px;\n  padding: 0px;\n  /* Allows content to fill the viewport and go beyond the bottom */\n  min-height: 100%;\n}\n#__next {\n  flex-shrink: 0;\n  flex-basis: auto;\n  flex-direction: column;\n  flex-grow: 1;\n  display: flex;\n  flex: 1;\n}\nhtml {\n  scroll-behavior: smooth;\n  /* Prevent text size change on orientation change https://gist.github.com/tfausak/2222823#file-ios-8-web-app-html-L138 */\n  -webkit-text-size-adjust: 100%;\n  height: 100%;\n}\nbody {\n  display: flex;\n  /* Allows you to scroll below the viewport; default value is visible */\n  overflow-y: auto;\n  overscroll-behavior-y: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -ms-overflow-style: scrollbar;\n}\n";exports.style=style;function getInitialProps(_ref){var renderPage,_AppRegistry$getAppli,getStyleElement,page,styles;return _regenerator.default.async(function getInitialProps$(_context){while(1){switch(_context.prev=_context.next){case 0:renderPage=_ref.renderPage;_reactNative.AppRegistry.registerComponent('Main',function(){return _document.Main;});_AppRegistry$getAppli=_reactNative.AppRegistry.getApplication('Main'),getStyleElement=_AppRegistry$getAppli.getStyleElement;page=renderPage();styles=[React.createElement("style",{dangerouslySetInnerHTML:{__html:style}}),getStyleElement()];return _context.abrupt("return",_objectSpread(_objectSpread({},page),{},{styles:React.Children.toArray(styles)}));case 6:case"end":return _context.stop();}}},null,null,null,Promise);}var Document=function(_NextDocument){(0,_inherits2.default)(Document,_NextDocument);var _super=_createSuper(Document);function Document(){(0,_classCallCheck2.default)(this,Document);return _super.apply(this,arguments);}(0,_createClass2.default)(Document,[{key:"render",value:function render(){return React.createElement(_document.Html,null,React.createElement(_document.Head,null,React.createElement("meta",{httpEquiv:"X-UA-Compatible",content:"IE=edge"})),React.createElement("body",null,React.createElement(_document.Main,null),React.createElement(_document.NextScript,null)));}}]);return Document;}(_document.default);exports.Document=Document;Document.getInitialProps=getInitialProps;var _default=Document;exports.default=_default;