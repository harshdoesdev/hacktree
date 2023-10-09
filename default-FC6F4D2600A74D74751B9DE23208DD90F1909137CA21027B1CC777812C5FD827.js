/* ftd-language.js */

Prism.languages.ftd = {
    'comment': [
        {
            'pattern': /\/--\s*((?!--)[\S\s])*/g,
            'greedy': true,
            'alias': "section-comment",
        },
        {
            "pattern": /[\s]*\/[\w]+(:).*\n/g,
            "greedy": true,
            "alias": "header-comment",
        },
        {
            'pattern': /(;;).*\n/g,
            'greedy': true,
            'alias': "inline-or-line-comment",
        }
    ],
    /*
    -- [section-type] <section-name>: [caption]
    [header-type] <header>: [value]

    [block headers]

    [body] -> string

    [children]

    [-- end: <section-name>]
    */
    'string': {
        'pattern': /^[ \t\n]*--\s+(.*)(\n(?![ \n\t]*--).*)*/g,
        'inside': {
            /* section-identifier */
            'section-identifier': /([ \t\n])*--\s+/g,
            /* [section type] <section name>: */
            'punctuation': {
                'pattern': /^(.*):/g,
                'inside': {
                    "semi-colon": /:/g,
                    'keyword': /^(component|record|end|or-type)/g,
                    "value-type": /^(integer|boolean|decimal|string)/g,
                    "kernel-type": /\s*ftd[\S]+/g,
                    'type-modifier': {
                        'pattern': /(\s)+list(?=\s)/g,
                        'lookbehind': true,
                    },
                    "section-name": {
                        'pattern': /(\s)*.+/g,
                        'lookbehind': true,
                    },
                }
            },
            /* section caption */
            'section-caption': /^.+(?=\n)*/g,
            /* header name: header value */
            'regex': {
                'pattern': /(?!--\s*).*[:]\s*(.*)(\n)*/g,
                'inside': {
                    /* if condition on component */
                    'header-condition': /\s*if\s*:(.)+/g,
                    /* header event */
                    'event': /\s*\$on(.)+\$(?=:)/g,
                    /* header processor */
                    'processor': /\s*\$[^:]+\$(?=:)/g,
                    /* header name => [header-type] <name> [header-condition] */
                    'regex': {
                        'pattern': /[^:]+(?=:)/g,
                        'inside': {
                            /* [header-condition]  */
                            'header-condition': /if\s*{.+}/g,
                            /* [header-type] <name> */
                            'tag': {
                                'pattern': /(.)+(?=if)?/g,
                                'inside': {
                                    'kernel-type': /^\s*ftd[\S]+/g,
                                    'header-type': /^(record|caption|body|caption or body|body or caption|integer|boolean|decimal|string)/g,
                                    'type-modifier': {
                                        'pattern': /(\s)+list(?=\s)/g,
                                        'lookbehind': true,
                                    },
                                    'header-name': {
                                        'pattern': /(\s)*(.)+/g,
                                        'lookbehind': true,
                                    },
                                }
                            }
                        }
                    },
                    /* semicolon */
                    "semi-colon": /:/g,
                    /* header value (if any) */
                    'header-value': {
                        'pattern': /(\s)*(.+)/g,
                        'lookbehind': true,
                    }
                }
            },
        },
    },
};
/**
 * marked v5.1.1 - a markdown parser
 * Copyright (c) 2011-2023, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */
// Content taken from https://cdn.jsdelivr.net/npm/marked/marked.min.js
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).marked={})}(this,function(r){"use strict";function i(e,t){for(var u=0;u<t.length;u++){var n=t[u];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,function(e){e=function(e,t){if("object"!=typeof e||null===e)return e;var u=e[Symbol.toPrimitive];if(void 0===u)return("string"===t?String:Number)(e);u=u.call(e,t||"default");if("object"!=typeof u)return u;throw new TypeError("@@toPrimitive must return a primitive value.")}(e,"string");return"symbol"==typeof e?e:String(e)}(n.key),n)}}function g(){return(g=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var u,n=arguments[t];for(u in n)Object.prototype.hasOwnProperty.call(n,u)&&(e[u]=n[u])}return e}).apply(this,arguments)}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var u=0,n=new Array(t);u<t;u++)n[u]=e[u];return n}function c(e,t){var u,n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){var u;if(e)return"string"==typeof e?s(e,t):"Map"===(u="Object"===(u=Object.prototype.toString.call(e).slice(8,-1))&&e.constructor?e.constructor.name:u)||"Set"===u?Array.from(e):"Arguments"===u||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u)?s(e,t):void 0}(e))||t&&e&&"number"==typeof e.length)return n&&(e=n),u=0,function(){return u>=e.length?{done:!0}:{done:!1,value:e[u++]}};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var t=0;function e(e){return"__private_"+t+++"_"+e}function F(e,t){if(Object.prototype.hasOwnProperty.call(e,t))return e;throw new TypeError("attempted to use private field on non-instance")}function u(){return{async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}function n(e){r.defaults=e}r.defaults=u();function a(e){return j[e]}var o=/[&<>"']/,P=new RegExp(o.source,"g"),l=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,O=new RegExp(l.source,"g"),j={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function D(e,t){if(t){if(o.test(e))return e.replace(P,a)}else if(l.test(e))return e.replace(O,a);return e}var Z=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function x(e){return e.replace(Z,function(e,t){return"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""})}var q=/(^|[^\[])\^/g;function p(u,e){u="string"==typeof u?u:u.source,e=e||"";var n={replace:function(e,t){return t=(t=t.source||t).replace(q,"$1"),u=u.replace(e,t),n},getRegex:function(){return new RegExp(u,e)}};return n}var L=/[^\w:]/g,U=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function h(e,t,u){if(e){try{n=decodeURIComponent(x(u)).replace(L,"").toLowerCase()}catch(e){return null}if(0===n.indexOf("javascript:")||0===n.indexOf("vbscript:")||0===n.indexOf("data:"))return null}var n;t&&!U.test(u)&&(e=u,f[" "+(n=t)]||(Q.test(n)?f[" "+n]=n+"/":f[" "+n]=A(n,"/",!0)),t=-1===(n=f[" "+n]).indexOf(":"),u="//"===e.substring(0,2)?t?e:n.replace(M,"$1")+e:"/"===e.charAt(0)?t?e:n.replace(H,"$1")+e:n+e);try{u=encodeURI(u).replace(/%25/g,"%")}catch(e){return null}return u}var f={},Q=/^[^:]+:\/*[^/]*$/,M=/^([^:]+:)[\s\S]*$/,H=/^([^:]+:\/*[^/]*)[\s\S]*$/;var d={exec:function(){}};function k(e,t){var u=e.replace(/\|/g,function(e,t,u){for(var n=!1,r=t;0<=--r&&"\\"===u[r];)n=!n;return n?"|":" |"}).split(/ \|/),n=0;if(u[0].trim()||u.shift(),0<u.length&&!u[u.length-1].trim()&&u.pop(),u.length>t)u.splice(t);else for(;u.length<t;)u.push("");for(;n<u.length;n++)u[n]=u[n].trim().replace(/\\\|/g,"|");return u}function A(e,t,u){var n=e.length;if(0===n)return"";for(var r=0;r<n;){var i=e.charAt(n-r-1);if((i!==t||u)&&(i===t||!u))break;r++}return e.slice(0,n-r)}function C(e,t,u,n){var r=t.href,t=t.title?D(t.title):null,i=e[1].replace(/\\([\[\]])/g,"$1");return"!"!==e[0].charAt(0)?(n.state.inLink=!0,e={type:"link",raw:u,href:r,title:t,text:i,tokens:n.inlineTokens(i)},n.state.inLink=!1,e):{type:"image",raw:u,href:r,title:t,text:D(i)}}var E=function(){function e(e){this.options=e||r.defaults}var t=e.prototype;return t.space=function(e){e=this.rules.block.newline.exec(e);if(e&&0<e[0].length)return{type:"space",raw:e[0]}},t.code=function(e){var t,e=this.rules.block.code.exec(e);if(e)return t=e[0].replace(/^ {1,4}/gm,""),{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?t:A(t,"\n")}},t.fences=function(e){var t,u,n,r,e=this.rules.block.fences.exec(e);if(e)return t=e[0],u=t,n=e[3]||"",u=null===(u=t.match(/^(\s+)(?:```)/))?n:(r=u[1],n.split("\n").map(function(e){var t=e.match(/^\s+/);return null!==t&&t[0].length>=r.length?e.slice(r.length):e}).join("\n")),{type:"code",raw:t,lang:e[2]&&e[2].trim().replace(this.rules.inline._escapes,"$1"),text:u}},t.heading=function(e){var t,u,e=this.rules.block.heading.exec(e);if(e)return t=e[2].trim(),/#$/.test(t)&&(u=A(t,"#"),!this.options.pedantic&&u&&!/ $/.test(u)||(t=u.trim())),{type:"heading",raw:e[0],depth:e[1].length,text:t,tokens:this.lexer.inline(t)}},t.hr=function(e){e=this.rules.block.hr.exec(e);if(e)return{type:"hr",raw:e[0]}},t.blockquote=function(e){var t,u,n,e=this.rules.block.blockquote.exec(e);if(e)return t=e[0].replace(/^ *>[ \t]?/gm,""),u=this.lexer.state.top,this.lexer.state.top=!0,n=this.lexer.blockTokens(t),this.lexer.state.top=u,{type:"blockquote",raw:e[0],tokens:n,text:t}},t.list=function(e){var t=this.rules.block.list.exec(e);if(t){var u,n,r,i,s,a,o,l,D,c,p,h=1<(g=t[1].trim()).length,f={type:"list",raw:"",ordered:h,start:h?+g.slice(0,-1):"",loose:!1,items:[]},g=h?"\\d{1,9}\\"+g.slice(-1):"\\"+g;this.options.pedantic&&(g=h?g:"[*+-]");for(var F=new RegExp("^( {0,3}"+g+")((?:[\t ][^\\n]*)?(?:\\n|$))");e&&(p=!1,t=F.exec(e))&&!this.rules.block.hr.test(e);){if(u=t[0],e=e.substring(u.length),o=t[2].split("\n",1)[0].replace(/^\t+/,function(e){return" ".repeat(3*e.length)}),l=e.split("\n",1)[0],this.options.pedantic?(i=2,c=o.trimLeft()):(i=t[2].search(/[^ ]/),c=o.slice(i=4<i?1:i),i+=t[1].length),s=!1,!o&&/^ *$/.test(l)&&(u+=l+"\n",e=e.substring(l.length+1),p=!0),!p)for(var d=new RegExp("^ {0,"+Math.min(3,i-1)+"}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))"),k=new RegExp("^ {0,"+Math.min(3,i-1)+"}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)"),A=new RegExp("^ {0,"+Math.min(3,i-1)+"}(?:```|~~~)"),C=new RegExp("^ {0,"+Math.min(3,i-1)+"}#");e&&(l=D=e.split("\n",1)[0],this.options.pedantic&&(l=l.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!A.test(l))&&!C.test(l)&&!d.test(l)&&!k.test(e);){if(l.search(/[^ ]/)>=i||!l.trim())c+="\n"+l.slice(i);else{if(s)break;if(4<=o.search(/[^ ]/))break;if(A.test(o))break;if(C.test(o))break;if(k.test(o))break;c+="\n"+l}s||l.trim()||(s=!0),u+=D+"\n",e=e.substring(D.length+1),o=l.slice(i)}f.loose||(a?f.loose=!0:/\n *\n *$/.test(u)&&(a=!0)),this.options.gfm&&(n=/^\[[ xX]\] /.exec(c))&&(r="[ ] "!==n[0],c=c.replace(/^\[[ xX]\] +/,"")),f.items.push({type:"list_item",raw:u,task:!!n,checked:r,loose:!1,text:c}),f.raw+=u}f.items[f.items.length-1].raw=u.trimRight(),f.items[f.items.length-1].text=c.trimRight(),f.raw=f.raw.trimRight();for(var E,x=f.items.length,m=0;m<x;m++)this.lexer.state.top=!1,f.items[m].tokens=this.lexer.blockTokens(f.items[m].text,[]),f.loose||(E=0<(E=f.items[m].tokens.filter(function(e){return"space"===e.type})).length&&E.some(function(e){return/\n.*\n/.test(e.raw)}),f.loose=E);if(f.loose)for(m=0;m<x;m++)f.items[m].loose=!0;return f}},t.html=function(e){var t,e=this.rules.block.html.exec(e);if(e)return t={type:"html",block:!0,raw:e[0],pre:!this.options.sanitizer&&("pre"===e[1]||"script"===e[1]||"style"===e[1]),text:e[0]},this.options.sanitize&&(e=this.options.sanitizer?this.options.sanitizer(e[0]):D(e[0]),t.type="paragraph",t.text=e,t.tokens=this.lexer.inline(e)),t},t.def=function(e){var t,u,n,e=this.rules.block.def.exec(e);if(e)return t=e[1].toLowerCase().replace(/\s+/g," "),u=e[2]?e[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"",n=e[3]&&e[3].substring(1,e[3].length-1).replace(this.rules.inline._escapes,"$1"),{type:"def",tag:t,raw:e[0],href:u,title:n}},t.table=function(e){e=this.rules.block.table.exec(e);if(e){var t={type:"table",header:k(e[1]).map(function(e){return{text:e}}),align:e[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:e[3]&&e[3].trim()?e[3].replace(/\n[ \t]*$/,"").split("\n"):[]};if(t.header.length===t.align.length){t.raw=e[0];for(var u,n,r,i=t.align.length,s=0;s<i;s++)/^ *-+: *$/.test(t.align[s])?t.align[s]="right":/^ *:-+: *$/.test(t.align[s])?t.align[s]="center":/^ *:-+ *$/.test(t.align[s])?t.align[s]="left":t.align[s]=null;for(i=t.rows.length,s=0;s<i;s++)t.rows[s]=k(t.rows[s],t.header.length).map(function(e){return{text:e}});for(i=t.header.length,u=0;u<i;u++)t.header[u].tokens=this.lexer.inline(t.header[u].text);for(i=t.rows.length,u=0;u<i;u++)for(r=t.rows[u],n=0;n<r.length;n++)r[n].tokens=this.lexer.inline(r[n].text);return t}}},t.lheading=function(e){e=this.rules.block.lheading.exec(e);if(e)return{type:"heading",raw:e[0],depth:"="===e[2].charAt(0)?1:2,text:e[1],tokens:this.lexer.inline(e[1])}},t.paragraph=function(e){var t,e=this.rules.block.paragraph.exec(e);if(e)return t="\n"===e[1].charAt(e[1].length-1)?e[1].slice(0,-1):e[1],{type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}},t.text=function(e){e=this.rules.block.text.exec(e);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}},t.escape=function(e){e=this.rules.inline.escape.exec(e);if(e)return{type:"escape",raw:e[0],text:D(e[1])}},t.tag=function(e){e=this.rules.inline.tag.exec(e);if(e)return!this.lexer.state.inLink&&/^<a /i.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(e[0]):D(e[0]):e[0]}},t.link=function(e){e=this.rules.inline.link.exec(e);if(e){var t=e[2].trim();if(!this.options.pedantic&&/^</.test(t)){if(!/>$/.test(t))return;var u=A(t.slice(0,-1),"\\");if((t.length-u.length)%2==0)return}else{u=function(e,t){if(-1!==e.indexOf(t[1]))for(var u=e.length,n=0,r=0;r<u;r++)if("\\"===e[r])r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&--n<0)return r;return-1}(e[2],"()");-1<u&&(r=(0===e[0].indexOf("!")?5:4)+e[1].length+u,e[2]=e[2].substring(0,u),e[0]=e[0].substring(0,r).trim(),e[3]="")}var n,u=e[2],r="";return this.options.pedantic?(n=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(u))&&(u=n[1],r=n[3]):r=e[3]?e[3].slice(1,-1):"",u=u.trim(),C(e,{href:(u=/^</.test(u)?this.options.pedantic&&!/>$/.test(t)?u.slice(1):u.slice(1,-1):u)&&u.replace(this.rules.inline._escapes,"$1"),title:r&&r.replace(this.rules.inline._escapes,"$1")},e[0],this.lexer)}},t.reflink=function(e,t){var u;if(u=(u=this.rules.inline.reflink.exec(e))||this.rules.inline.nolink.exec(e))return(e=t[(e=(u[2]||u[1]).replace(/\s+/g," ")).toLowerCase()])?C(u,e,u[0],this.lexer):{type:"text",raw:t=u[0].charAt(0),text:t}},t.emStrong=function(e,t,u){void 0===u&&(u="");var n=this.rules.inline.emStrong.lDelim.exec(e);if(n&&((!n[3]||!u.match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDF50-\uDF59\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEC0-\uDED3\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDCD0-\uDCEB\uDCF0-\uDCF9\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])/))&&(!(n[1]||n[2]||"")||!u||this.rules.inline.punctuation.exec(u)))){var r=n[0].length-1,i=r,s=0,a="*"===n[0][0]?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(a.lastIndex=0,t=t.slice(-1*e.length+r);null!=(n=a.exec(t));){var o,l=n[1]||n[2]||n[3]||n[4]||n[5]||n[6];if(l)if(l=l.length,n[3]||n[4])i+=l;else if((n[5]||n[6])&&r%3&&!((r+l)%3))s+=l;else if(!(0<(i-=l)))return l=Math.min(l,l+i+s),o=e.slice(0,r+n.index+l+1),Math.min(r,l)%2?(l=o.slice(1,-1),{type:"em",raw:o,text:l,tokens:this.lexer.inlineTokens(l)}):(l=o.slice(2,-2),{type:"strong",raw:o,text:l,tokens:this.lexer.inlineTokens(l)})}}},t.codespan=function(e){var t,u,n,e=this.rules.inline.code.exec(e);if(e)return n=e[2].replace(/\n/g," "),t=/[^ ]/.test(n),u=/^ /.test(n)&&/ $/.test(n),n=D(n=t&&u?n.substring(1,n.length-1):n,!0),{type:"codespan",raw:e[0],text:n}},t.br=function(e){e=this.rules.inline.br.exec(e);if(e)return{type:"br",raw:e[0]}},t.del=function(e){e=this.rules.inline.del.exec(e);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}},t.autolink=function(e,t){var u,e=this.rules.inline.autolink.exec(e);if(e)return t="@"===e[2]?"mailto:"+(u=D(this.options.mangle?t(e[1]):e[1])):u=D(e[1]),{type:"link",raw:e[0],text:u,href:t,tokens:[{type:"text",raw:u,text:u}]}},t.url=function(e,t){var u,n,r,i;if(u=this.rules.inline.url.exec(e)){if("@"===u[2])r="mailto:"+(n=D(this.options.mangle?t(u[0]):u[0]));else{for(;i=u[0],u[0]=this.rules.inline._backpedal.exec(u[0])[0],i!==u[0];);n=D(u[0]),r="www."===u[1]?"http://"+u[0]:u[0]}return{type:"link",raw:u[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}},t.inlineText=function(e,t){e=this.rules.inline.text.exec(e);if(e)return t=this.lexer.state.inRawBlock?this.options.sanitize?this.options.sanitizer?this.options.sanitizer(e[0]):D(e[0]):e[0]:D(this.options.smartypants?t(e[0]):e[0]),{type:"text",raw:e[0],text:t}},e}(),m={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:d,lheading:/^((?:(?!^bull ).|\n(?!\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\.|[^\[\]\\])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/},b=(m.def=p(m.def).replace("label",m._label).replace("title",m._title).getRegex(),m.bullet=/(?:[*+-]|\d{1,9}[.)])/,m.listItemStart=p(/^( *)(bull) */).replace("bull",m.bullet).getRegex(),m.list=p(m.list).replace(/bull/g,m.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+m.def.source+")").getRegex(),m._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",m._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,m.html=p(m.html,"i").replace("comment",m._comment).replace("tag",m._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),m.lheading=p(m.lheading).replace(/bull/g,m.bullet).getRegex(),m.paragraph=p(m._paragraph).replace("hr",m.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",m._tag).getRegex(),m.blockquote=p(m.blockquote).replace("paragraph",m.paragraph).getRegex(),m.normal=g({},m),m.gfm=g({},m.normal,{table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"}),m.gfm.table=p(m.gfm.table).replace("hr",m.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",m._tag).getRegex(),m.gfm.paragraph=p(m._paragraph).replace("hr",m.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",m.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",m._tag).getRegex(),m.pedantic=g({},m.normal,{html:p("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",m._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:d,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:p(m.normal._paragraph).replace("hr",m.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",m.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()}),{escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:d,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,rDelimAst:/^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,rDelimUnd:/^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:d,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^((?![*_])[\spunctuation])/});function N(e){return e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function w(e){for(var t,u="",n=e.length,r=0;r<n;r++)t=e.charCodeAt(r),u+="&#"+(t=.5<Math.random()?"x"+t.toString(16):t)+";";return u}b._punctuation="\\p{P}$+<=>`^|~",b.punctuation=p(b.punctuation,"u").replace(/punctuation/g,b._punctuation).getRegex(),b.blockSkip=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,b.anyPunctuation=/\\[punct]/g,b._escapes=/\\([punct])/g,b._comment=p(m._comment).replace("(?:--\x3e|$)","--\x3e").getRegex(),b.emStrong.lDelim=p(b.emStrong.lDelim,"u").replace(/punct/g,b._punctuation).getRegex(),b.emStrong.rDelimAst=p(b.emStrong.rDelimAst,"gu").replace(/punct/g,b._punctuation).getRegex(),b.emStrong.rDelimUnd=p(b.emStrong.rDelimUnd,"gu").replace(/punct/g,b._punctuation).getRegex(),b.anyPunctuation=p(b.anyPunctuation,"gu").replace(/punct/g,b._punctuation).getRegex(),b._escapes=p(b._escapes,"gu").replace(/punct/g,b._punctuation).getRegex(),b._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,b._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,b.autolink=p(b.autolink).replace("scheme",b._scheme).replace("email",b._email).getRegex(),b._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,b.tag=p(b.tag).replace("comment",b._comment).replace("attribute",b._attribute).getRegex(),b._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,b._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,b._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,b.link=p(b.link).replace("label",b._label).replace("href",b._href).replace("title",b._title).getRegex(),b.reflink=p(b.reflink).replace("label",b._label).replace("ref",m._label).getRegex(),b.nolink=p(b.nolink).replace("ref",m._label).getRegex(),b.reflinkSearch=p(b.reflinkSearch,"g").replace("reflink",b.reflink).replace("nolink",b.nolink).getRegex(),b.normal=g({},b),b.pedantic=g({},b.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:p(/^!?\[(label)\]\((.*?)\)/).replace("label",b._label).getRegex(),reflink:p(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",b._label).getRegex()}),b.gfm=g({},b.normal,{escape:p(b.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/}),b.gfm.url=p(b.gfm.url,"i").replace("email",b.gfm._extended_email).getRegex(),b.breaks=g({},b.gfm,{br:p(b.br).replace("{2,}","*").getRegex(),text:p(b.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});var B=function(){function u(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||r.defaults,this.options.tokenizer=this.options.tokenizer||new E,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,(this.tokenizer.lexer=this).inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};e={block:m.normal,inline:b.normal};this.options.pedantic?(e.block=m.pedantic,e.inline=b.pedantic):this.options.gfm&&(e.block=m.gfm,this.options.breaks?e.inline=b.breaks:e.inline=b.gfm),this.tokenizer.rules=e}u.lex=function(e,t){return new u(t).lex(e)},u.lexInline=function(e,t){return new u(t).inlineTokens(e)};var e,t,n=u.prototype;return n.lex=function(e){var t;for(e=e.replace(/\r\n|\r/g,"\n"),this.blockTokens(e,this.tokens);t=this.inlineQueue.shift();)this.inlineTokens(t.src,t.tokens);return this.tokens},n.blockTokens=function(r,i){var s,a,o,l,D=this;for(void 0===i&&(i=[]),r=this.options.pedantic?r.replace(/\t/g,"    ").replace(/^ +$/gm,""):r.replace(/^( *)(\t+)/gm,function(e,t,u){return t+"    ".repeat(u.length)});r;){var e=function(){if(D.options.extensions&&D.options.extensions.block&&D.options.extensions.block.some(function(e){return!!(s=e.call({lexer:D},r,i))&&(r=r.substring(s.raw.length),i.push(s),!0)}))return"continue";if(s=D.tokenizer.space(r))return r=r.substring(s.raw.length),1===s.raw.length&&0<i.length?i[i.length-1].raw+="\n":i.push(s),"continue";if(s=D.tokenizer.code(r))return r=r.substring(s.raw.length),!(a=i[i.length-1])||"paragraph"!==a.type&&"text"!==a.type?i.push(s):(a.raw+="\n"+s.raw,a.text+="\n"+s.text,D.inlineQueue[D.inlineQueue.length-1].src=a.text),"continue";if(s=D.tokenizer.fences(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=D.tokenizer.heading(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=D.tokenizer.hr(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=D.tokenizer.blockquote(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=D.tokenizer.list(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=D.tokenizer.html(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=D.tokenizer.def(r))return r=r.substring(s.raw.length),!(a=i[i.length-1])||"paragraph"!==a.type&&"text"!==a.type?D.tokens.links[s.tag]||(D.tokens.links[s.tag]={href:s.href,title:s.title}):(a.raw+="\n"+s.raw,a.text+="\n"+s.raw,D.inlineQueue[D.inlineQueue.length-1].src=a.text),"continue";if(s=D.tokenizer.table(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=D.tokenizer.lheading(r))return r=r.substring(s.raw.length),i.push(s),"continue";var t,u,n;if(o=r,D.options.extensions&&D.options.extensions.startBlock&&(t=1/0,u=r.slice(1),D.options.extensions.startBlock.forEach(function(e){"number"==typeof(n=e.call({lexer:this},u))&&0<=n&&(t=Math.min(t,n))}),t<1/0)&&0<=t&&(o=r.substring(0,t+1)),D.state.top&&(s=D.tokenizer.paragraph(o)))return a=i[i.length-1],l&&"paragraph"===a.type?(a.raw+="\n"+s.raw,a.text+="\n"+s.text,D.inlineQueue.pop(),D.inlineQueue[D.inlineQueue.length-1].src=a.text):i.push(s),l=o.length!==r.length,r=r.substring(s.raw.length),"continue";if(s=D.tokenizer.text(r))return r=r.substring(s.raw.length),(a=i[i.length-1])&&"text"===a.type?(a.raw+="\n"+s.raw,a.text+="\n"+s.text,D.inlineQueue.pop(),D.inlineQueue[D.inlineQueue.length-1].src=a.text):i.push(s),"continue";if(r){var e="Infinite loop on byte: "+r.charCodeAt(0);if(D.options.silent)return console.error(e),"break";throw new Error(e)}}();if("continue"!==e&&"break"===e)break}return this.state.top=!0,i},n.inline=function(e,t){return this.inlineQueue.push({src:e,tokens:t=void 0===t?[]:t}),t},n.inlineTokens=function(r,i){var s,a,o,e,l,D,c=this,p=(void 0===i&&(i=[]),r);if(this.tokens.links){var t=Object.keys(this.tokens.links);if(0<t.length)for(;null!=(e=this.tokenizer.rules.inline.reflinkSearch.exec(p));)t.includes(e[0].slice(e[0].lastIndexOf("[")+1,-1))&&(p=p.slice(0,e.index)+"["+"a".repeat(e[0].length-2)+"]"+p.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(e=this.tokenizer.rules.inline.blockSkip.exec(p));)p=p.slice(0,e.index)+"["+"a".repeat(e[0].length-2)+"]"+p.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;null!=(e=this.tokenizer.rules.inline.anyPunctuation.exec(p));)p=p.slice(0,e.index)+"++"+p.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;r;){var u=function(){if(l||(D=""),l=!1,c.options.extensions&&c.options.extensions.inline&&c.options.extensions.inline.some(function(e){return!!(s=e.call({lexer:c},r,i))&&(r=r.substring(s.raw.length),i.push(s),!0)}))return"continue";if(s=c.tokenizer.escape(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=c.tokenizer.tag(r))return r=r.substring(s.raw.length),(a=i[i.length-1])&&"text"===s.type&&"text"===a.type?(a.raw+=s.raw,a.text+=s.text):i.push(s),"continue";if(s=c.tokenizer.link(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=c.tokenizer.reflink(r,c.tokens.links))return r=r.substring(s.raw.length),(a=i[i.length-1])&&"text"===s.type&&"text"===a.type?(a.raw+=s.raw,a.text+=s.text):i.push(s),"continue";if(s=c.tokenizer.emStrong(r,p,D))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=c.tokenizer.codespan(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=c.tokenizer.br(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=c.tokenizer.del(r))return r=r.substring(s.raw.length),i.push(s),"continue";if(s=c.tokenizer.autolink(r,w))return r=r.substring(s.raw.length),i.push(s),"continue";if(!c.state.inLink&&(s=c.tokenizer.url(r,w)))return r=r.substring(s.raw.length),i.push(s),"continue";var t,u,n;if(o=r,c.options.extensions&&c.options.extensions.startInline&&(t=1/0,u=r.slice(1),c.options.extensions.startInline.forEach(function(e){"number"==typeof(n=e.call({lexer:this},u))&&0<=n&&(t=Math.min(t,n))}),t<1/0)&&0<=t&&(o=r.substring(0,t+1)),s=c.tokenizer.inlineText(o,N))return r=r.substring(s.raw.length),"_"!==s.raw.slice(-1)&&(D=s.raw.slice(-1)),l=!0,(a=i[i.length-1])&&"text"===a.type?(a.raw+=s.raw,a.text+=s.text):i.push(s),"continue";if(r){var e="Infinite loop on byte: "+r.charCodeAt(0);if(c.options.silent)return console.error(e),"break";throw new Error(e)}}();if("continue"!==u&&"break"===u)break}return i},n=u,t=[{key:"rules",get:function(){return{block:m,inline:b}}}],(e=null)&&i(n.prototype,e),t&&i(n,t),Object.defineProperty(n,"prototype",{writable:!1}),u}(),y=function(){function e(e){this.options=e||r.defaults}var t=e.prototype;return t.code=function(e,t,u){var n,t=(t||"").match(/\S*/)[0];return this.options.highlight&&null!=(n=this.options.highlight(e,t))&&n!==e&&(u=!0,e=n),e=e.replace(/\n$/,"")+"\n",t?'<pre><code class="'+this.options.langPrefix+D(t)+'">'+(u?e:D(e,!0))+"</code></pre>\n":"<pre><code>"+(u?e:D(e,!0))+"</code></pre>\n"},t.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},t.html=function(e,t){return e},t.heading=function(e,t,u,n){return this.options.headerIds?"<h"+t+' id="'+(this.options.headerPrefix+n.slug(u))+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"},t.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},t.list=function(e,t,u){var n=t?"ol":"ul";return"<"+n+(t&&1!==u?' start="'+u+'"':"")+">\n"+e+"</"+n+">\n"},t.listitem=function(e){return"<li>"+e+"</li>\n"},t.checkbox=function(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "},t.paragraph=function(e){return"<p>"+e+"</p>\n"},t.table=function(e,t){return"<table>\n<thead>\n"+e+"</thead>\n"+(t=t&&"<tbody>"+t+"</tbody>")+"</table>\n"},t.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},t.tablecell=function(e,t){var u=t.header?"th":"td";return(t.align?"<"+u+' align="'+t.align+'">':"<"+u+">")+e+"</"+u+">\n"},t.strong=function(e){return"<strong>"+e+"</strong>"},t.em=function(e){return"<em>"+e+"</em>"},t.codespan=function(e){return"<code>"+e+"</code>"},t.br=function(){return this.options.xhtml?"<br/>":"<br>"},t.del=function(e){return"<del>"+e+"</del>"},t.link=function(e,t,u){return null===(e=h(this.options.sanitize,this.options.baseUrl,e))?u:(e='<a href="'+e+'"',t&&(e+=' title="'+t+'"'),e+">"+u+"</a>")},t.image=function(e,t,u){return null===(e=h(this.options.sanitize,this.options.baseUrl,e))?u:(e='<img src="'+e+'" alt="'+u+'"',t&&(e+=' title="'+t+'"'),e+(this.options.xhtml?"/>":">"))},t.text=function(e){return e},e}(),v=function(){function e(){}var t=e.prototype;return t.strong=function(e){return e},t.em=function(e){return e},t.codespan=function(e){return e},t.del=function(e){return e},t.html=function(e){return e},t.text=function(e){return e},t.link=function(e,t,u){return""+u},t.image=function(e,t,u){return""+u},t.br=function(){return""},e}(),_=function(){function e(){this.seen={}}var t=e.prototype;return t.serialize=function(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")},t.getNextSafeSlug=function(e,t){var u=e,n=0;if(this.seen.hasOwnProperty(u))for(n=this.seen[e];u=e+"-"+ ++n,this.seen.hasOwnProperty(u););return t||(this.seen[e]=n,this.seen[u]=0),u},t.slug=function(e,t){void 0===t&&(t={});e=this.serialize(e);return this.getNextSafeSlug(e,t.dryrun)},e}(),z=function(){function u(e){this.options=e||r.defaults,this.options.renderer=this.options.renderer||new y,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new v,this.slugger=new _}u.parse=function(e,t){return new u(t).parse(e)},u.parseInline=function(e,t){return new u(t).parseInline(e)};var e=u.prototype;return e.parse=function(e,t){void 0===t&&(t=!0);for(var u,n,r,i,s,a,o,l,D,c,p,h,f,g,F,d,k="",A=e.length,C=0;C<A;C++)if(l=e[C],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[l.type]&&(!1!==(d=this.options.extensions.renderers[l.type].call({parser:this},l))||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)))k+=d||"";else switch(l.type){case"space":continue;case"hr":k+=this.renderer.hr();continue;case"heading":k+=this.renderer.heading(this.parseInline(l.tokens),l.depth,x(this.parseInline(l.tokens,this.textRenderer)),this.slugger);continue;case"code":k+=this.renderer.code(l.text,l.lang,l.escaped);continue;case"table":for(a=D="",r=l.header.length,u=0;u<r;u++)a+=this.renderer.tablecell(this.parseInline(l.header[u].tokens),{header:!0,align:l.align[u]});for(D+=this.renderer.tablerow(a),o="",r=l.rows.length,u=0;u<r;u++){for(a="",i=(s=l.rows[u]).length,n=0;n<i;n++)a+=this.renderer.tablecell(this.parseInline(s[n].tokens),{header:!1,align:l.align[n]});o+=this.renderer.tablerow(a)}k+=this.renderer.table(D,o);continue;case"blockquote":o=this.parse(l.tokens),k+=this.renderer.blockquote(o);continue;case"list":for(D=l.ordered,E=l.start,c=l.loose,r=l.items.length,o="",u=0;u<r;u++)f=(h=l.items[u]).checked,g=h.task,p="",h.task&&(F=this.renderer.checkbox(f),c?0<h.tokens.length&&"paragraph"===h.tokens[0].type?(h.tokens[0].text=F+" "+h.tokens[0].text,h.tokens[0].tokens&&0<h.tokens[0].tokens.length&&"text"===h.tokens[0].tokens[0].type&&(h.tokens[0].tokens[0].text=F+" "+h.tokens[0].tokens[0].text)):h.tokens.unshift({type:"text",text:F}):p+=F),p+=this.parse(h.tokens,c),o+=this.renderer.listitem(p,g,f);k+=this.renderer.list(o,D,E);continue;case"html":k+=this.renderer.html(l.text,l.block);continue;case"paragraph":k+=this.renderer.paragraph(this.parseInline(l.tokens));continue;case"text":for(o=l.tokens?this.parseInline(l.tokens):l.text;C+1<A&&"text"===e[C+1].type;)o+="\n"+((l=e[++C]).tokens?this.parseInline(l.tokens):l.text);k+=t?this.renderer.paragraph(o):o;continue;default:var E='Token with "'+l.type+'" type was not found.';if(this.options.silent)return void console.error(E);throw new Error(E)}return k},e.parseInline=function(e,t){t=t||this.renderer;for(var u,n,r="",i=e.length,s=0;s<i;s++)if(u=e[s],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[u.type]&&(!1!==(n=this.options.extensions.renderers[u.type].call({parser:this},u))||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(u.type)))r+=n||"";else switch(u.type){case"escape":r+=t.text(u.text);break;case"html":r+=t.html(u.text);break;case"link":r+=t.link(u.href,u.title,this.parseInline(u.tokens,t));break;case"image":r+=t.image(u.href,u.title,u.text);break;case"strong":r+=t.strong(this.parseInline(u.tokens,t));break;case"em":r+=t.em(this.parseInline(u.tokens,t));break;case"codespan":r+=t.codespan(u.text);break;case"br":r+=t.br();break;case"del":r+=t.del(this.parseInline(u.tokens,t));break;case"text":r+=t.text(u.text);break;default:var a='Token with "'+u.type+'" type was not found.';if(this.options.silent)return void console.error(a);throw new Error(a)}return r},u}(),$=function(){function e(e){this.options=e||r.defaults}var t=e.prototype;return t.preprocess=function(e){return e},t.postprocess=function(e){return e},e}(),S=($.passThroughHooks=new Set(["preprocess","postprocess"]),e("parseMarkdown")),T=e("onError"),d=function(){function e(){Object.defineProperty(this,T,{value:G}),Object.defineProperty(this,S,{value:X}),this.defaults=u(),this.options=this.setOptions,this.parse=F(this,S)[S](B.lex,z.parse),this.parseInline=F(this,S)[S](B.lexInline,z.parseInline),this.Parser=z,this.parser=z.parse,this.Renderer=y,this.TextRenderer=v,this.Lexer=B,this.lexer=B.lex,this.Tokenizer=E,this.Slugger=_,this.Hooks=$,this.use.apply(this,arguments)}var t=e.prototype;return t.walkTokens=function(e,a){for(var o,l=this,D=[],t=c(e);!(o=t()).done;)!function(){var t=o.value;switch(D=D.concat(a.call(l,t)),t.type){case"table":for(var e=c(t.header);!(u=e()).done;){var u=u.value;D=D.concat(l.walkTokens(u.tokens,a))}for(var n,r=c(t.rows);!(n=r()).done;)for(var i=c(n.value);!(s=i()).done;){var s=s.value;D=D.concat(l.walkTokens(s.tokens,a))}break;case"list":D=D.concat(l.walkTokens(t.items,a));break;default:l.defaults.extensions&&l.defaults.extensions.childTokens&&l.defaults.extensions.childTokens[t.type]?l.defaults.extensions.childTokens[t.type].forEach(function(e){D=D.concat(l.walkTokens(t[e],a))}):t.tokens&&(D=D.concat(l.walkTokens(t.tokens,a)))}}();return D},t.use=function(){for(var D=this,c=this.defaults.extensions||{renderers:{},childTokens:{}},e=arguments.length,t=new Array(e),u=0;u<e;u++)t[u]=arguments[u];return t.forEach(function(s){var u,e=g({},s);if(e.async=D.defaults.async||e.async||!1,s.extensions&&(s.extensions.forEach(function(r){if(!r.name)throw new Error("extension name required");var i;if(r.renderer&&(i=c.renderers[r.name],c.renderers[r.name]=i?function(){for(var e=arguments.length,t=new Array(e),u=0;u<e;u++)t[u]=arguments[u];var n=r.renderer.apply(this,t);return n=!1===n?i.apply(this,t):n}:r.renderer),r.tokenizer){if(!r.level||"block"!==r.level&&"inline"!==r.level)throw new Error("extension level must be 'block' or 'inline'");c[r.level]?c[r.level].unshift(r.tokenizer):c[r.level]=[r.tokenizer],r.start&&("block"===r.level?c.startBlock?c.startBlock.push(r.start):c.startBlock=[r.start]:"inline"===r.level&&(c.startInline?c.startInline.push(r.start):c.startInline=[r.start]))}r.childTokens&&(c.childTokens[r.name]=r.childTokens)}),e.extensions=c),s.renderer){var t,a=D.defaults.renderer||new y(D.defaults);for(t in s.renderer)!function(r){var i=a[r];a[r]=function(){for(var e=arguments.length,t=new Array(e),u=0;u<e;u++)t[u]=arguments[u];var n=s.renderer[r].apply(a,t);return n=!1===n?i.apply(a,t):n}}(t);e.renderer=a}if(s.tokenizer){var n,o=D.defaults.tokenizer||new E(D.defaults);for(n in s.tokenizer)!function(r){var i=o[r];o[r]=function(){for(var e=arguments.length,t=new Array(e),u=0;u<e;u++)t[u]=arguments[u];var n=s.tokenizer[r].apply(o,t);return n=!1===n?i.apply(o,t):n}}(n);e.tokenizer=o}if(s.hooks){var r,l=D.defaults.hooks||new $;for(r in s.hooks)!function(r){var i=l[r];$.passThroughHooks.has(r)?l[r]=function(e){return D.defaults.async?Promise.resolve(s.hooks[r].call(l,e)).then(function(e){return i.call(l,e)}):(e=s.hooks[r].call(l,e),i.call(l,e))}:l[r]=function(){for(var e=arguments.length,t=new Array(e),u=0;u<e;u++)t[u]=arguments[u];var n=s.hooks[r].apply(l,t);return n=!1===n?i.apply(l,t):n}}(r);e.hooks=l}s.walkTokens&&(u=D.defaults.walkTokens,e.walkTokens=function(e){var t=[];return t.push(s.walkTokens.call(this,e)),t=u?t.concat(u.call(this,e)):t}),D.defaults=g({},D.defaults,e)}),this},t.setOptions=function(e){return this.defaults=g({},this.defaults,e),this},e}();function X(p,h){var f=this;return function(e,u,n){"function"==typeof u&&(n=u,u=null);var t,r=g({},u),i=(u=g({},f.defaults,r),F(f,T)[T](u.silent,u.async,n));if(null==e)return i(new Error("marked(): input parameter is undefined or null"));if("string"!=typeof e)return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(r=n,(t=u)&&!t.silent&&(r,(t.sanitize||t.sanitizer),!t.highlight&&"language-"===t.langPrefix,t.mangle,t.baseUrl,t.smartypants,t.xhtml,t.headerIds||t.headerPrefix),u.hooks&&(u.hooks.options=u),n){var s,a=u.highlight;try{u.hooks&&(e=u.hooks.preprocess(e)),s=p(e,u)}catch(e){return i(e)}var o,l=function(t){var e;if(!t)try{u.walkTokens&&f.walkTokens(s,u.walkTokens),e=h(s,u),u.hooks&&(e=u.hooks.postprocess(e))}catch(e){t=e}return u.highlight=a,t?i(t):n(null,e)};return!a||a.length<3?l():(delete u.highlight,s.length?(o=0,f.walkTokens(s,function(u){"code"===u.type&&(o++,setTimeout(function(){a(u.text,u.lang,function(e,t){if(e)return l(e);null!=t&&t!==u.text&&(u.text=t,u.escaped=!0),0===--o&&l()})},0))}),void(0===o&&l())):l())}if(u.async)return Promise.resolve(u.hooks?u.hooks.preprocess(e):e).then(function(e){return p(e,u)}).then(function(e){return u.walkTokens?Promise.all(f.walkTokens(e,u.walkTokens)).then(function(){return e}):e}).then(function(e){return h(e,u)}).then(function(e){return u.hooks?u.hooks.postprocess(e):e}).catch(i);try{u.hooks&&(e=u.hooks.preprocess(e));var D=p(e,u),c=(u.walkTokens&&f.walkTokens(D,u.walkTokens),h(D,u));return c=u.hooks?u.hooks.postprocess(c):c}catch(e){return i(e)}}}function G(u,n,r){return function(e){var t;if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",u)return t="<p>An error occurred:</p><pre>"+D(e.message+"",!0)+"</pre>",n?Promise.resolve(t):r?void r(null,t):t;if(n)return Promise.reject(e);if(!r)throw e;r(e)}}var R=new d(r.defaults);function I(e,t,u){return R.parse(e,t,u)}I.options=I.setOptions=function(e){return R.setOptions(e),n(I.defaults=R.defaults),I},I.getDefaults=u,I.defaults=r.defaults,I.use=function(){return R.use.apply(R,arguments),n(I.defaults=R.defaults),I},I.walkTokens=function(e,t){return R.walkTokens(e,t)},I.parseInline=R.parseInline,I.Parser=z,I.parser=z.parse,I.Renderer=y,I.TextRenderer=v,I.Lexer=B,I.lexer=B.lex,I.Tokenizer=E,I.Slugger=_,I.Hooks=$;var V=(I.parse=I).options,J=I.setOptions,K=I.use,W=I.walkTokens,Y=I.parseInline,ee=I,te=z.parse,ue=B.lex;r.Hooks=$,r.Lexer=B,r.Marked=d,r.Parser=z,r.Renderer=y,r.Slugger=_,r.TextRenderer=v,r.Tokenizer=E,r.getDefaults=u,r.lexer=ue,r.marked=I,r.options=V,r.parse=ee,r.parseInline=Y,r.parser=te,r.setOptions=J,r.use=K,r.walkTokens=W});
let fastn = {};

class Closure {
    #cached_value;
    #node;
    #property;
    #formula;
    #inherited;
    constructor(func, execute = true) {
        if (execute) {
            this.#cached_value = func();
        }
        this.#formula = func;
    }

    get() {
        return this.#cached_value;
    }
    getFormula() {
        return this.#formula;
    }
    addNodeProperty(node, property, inherited) {
        this.#node = node;
        this.#property = property;
        this.#inherited = inherited;
        this.updateUi();

        return this;
    }
    update() {
        this.#cached_value = this.#formula();
        this.updateUi();
    }
    getNode() {
        return this.#node;
    }
    updateUi() {
        if (!this.#node ||
            this.#property === null ||
            this.#property === undefined ||
            !this.#node.getNode()) {
            return;
        }

        this.#node.setStaticProperty(this.#property, this.#cached_value, this.#inherited);
    }
}

class Mutable {
    #value;
    #old_closure
    #closures;
    #closureInstance;
    constructor(val) {
        this.#value = null;
        this.#old_closure = null;
        this.#closures = [];
        this.#closureInstance = fastn.closure(() => this.#closures.forEach((closure) => closure.update()));
        this.set(val);
    }
    get(key) {
        if (!fastn_utils.isNull(key) && (this.#value instanceof RecordInstance || this.#value instanceof MutableList || this.#value instanceof Mutable)) {
            return this.#value.get(key)
        }
        return this.#value;
    }
    setWithoutUpdate(value) {
        if (this.#old_closure) {
            this.#value.removeClosure(this.#old_closure);
        }

        if (this.#value instanceof RecordInstance) {
            // this.#value.replace(value); will replace the record type
            // variable instance created which we don't want.
            // color: red
            // color if { something }: $orange-green
            // The `this.#value.replace(value);` will replace the value of
            // `orange-green` with `{light: red, dark: red}`
            this.#value = value;
        } else {
            this.#value = value;
        }

        if (this.#value instanceof Mutable) {
            this.#old_closure = fastn.closureWithoutExecute(() => this.#closureInstance.update());
            this.#value.addClosure(this.#old_closure);
        } else {
            this.#old_closure = null;
        }
    }
    set(value) {
        this.setWithoutUpdate(value);

        this.#closureInstance.update();
    }
    // we have to unlink all nodes, else they will be kept in memory after the node is removed from DOM
    unlinkNode(node) {
        this.#closures = this.#closures.filter(closure => closure.getNode() !== node);
    }
    addClosure(closure) {
        this.#closures.push(closure);
    }
    removeClosure(closure) {
        this.#closures = this.#closures.filter(c => c !== closure);
    }
    equalMutable(other) {
        if (!fastn_utils.deepEqual(this.get(), other.get())) {
            return false;
        }
        const thisClosures = this.#closures;
        const otherClosures = other.#closures;

        return thisClosures === otherClosures;
    }
    getClone() {
        return new Mutable(fastn_utils.clone(this.#value));
    }
}

class Proxy {
    #differentiator
    #cached_value
    #closures;
    #closureInstance;
    constructor(targets, differentiator) {
        this.#differentiator = differentiator;
        this.#cached_value = this.#differentiator().get();
        this.#closures = [];

        let proxy = this;
        for (let idx in targets) {
            targets[idx].addClosure(new Closure(function () {
                proxy.update();
                proxy.#closures.forEach(closure => closure.update());
            }));
            targets[idx].addClosure(this);
        }
    }
    addClosure(closure) {
        this.#closures.push(closure);
    }
    removeClosure(closure) {
        this.#closures = this.#closures.filter(c => c !== closure);
    }
    update() {
        this.#cached_value = this.#differentiator().get();
    }
    get(key) {
        if (!!key && (this.#cached_value instanceof RecordInstance || this.#cached_value instanceof MutableList || this.#cached_value instanceof Mutable)) {
            return this.#cached_value.get(key)
        }
        return this.#cached_value;
    }
    set(value) {
        // Todo: Optimization removed. Reuse optimization later again
        /*if (fastn_utils.deepEqual(this.#cached_value, value)) {
            return;
        }*/
        this.#differentiator().set(value);
    }
}

class MutableList {
    #list;
    #watchers;
    #closures;
    constructor(list) {
        this.#list = [];
        for (let idx in list) {
            this.#list.push( { item: fastn.wrapMutable(list[idx]), index: new Mutable(parseInt(idx)) });
        }
        this.#watchers = [];
        this.#closures = [];
    }
    addClosure(closure) {
        this.#closures.push(closure);
    }
    unlinkNode(node) {
        this.#closures = this.#closures.filter(closure => closure.getNode() !== node);
    }
    forLoop(root, dom_constructor) {
        let l = fastn_dom.forLoop(root, dom_constructor, this);
        this.#watchers.push(l);
        return l;
    }
    getList() {
        return this.#list;
    }
    getLength() {
        return this.#list.length;
    }
    get(idx) {
        if (fastn_utils.isNull(idx)) {
            return this.getList();
        }
        return this.#list[idx];
    }
    set(index, value) {
        if (value === undefined) {
            value = index
            if (!(value instanceof MutableList)) {
                if (!Array.isArray(value)) {
                    value = [value];
                }
                value = new MutableList(value);
            }

            let list = value.#list;
            this.#list = [];
            for (let i in list) {
                this.#list.push(list[i]);
            }

            for (let i in this.#watchers) {
                this.#watchers[i].createAllNode();
            }
        } else {
            index = fastn_utils.getFlattenStaticValue(index);
            this.#list[index].item.set(value);
        }

        this.#closures.forEach((closure) => closure.update());
    }
    insertAt(index, value) {
        index = fastn_utils.getFlattenStaticValue(index);
        let mutable = fastn.wrapMutable(value);
        this.#list.splice(index, 0, { item: mutable, index: new Mutable(index) });
        // for every item after the inserted item, update the index
        for (let i = index + 1; i < this.#list.length; i++) {
            this.#list[i].index.set(i);
        }

        for (let i in this.#watchers) {
            this.#watchers[i].createNode(index);
        }
        this.#closures.forEach((closure) => closure.update());
    }
    push(value) {
        this.insertAt(this.#list.length, value);
    }
    deleteAt(index) {
        index = fastn_utils.getFlattenStaticValue(index);
        this.#list.splice(index, 1);
        // for every item after the deleted item, update the index
        for (let i = index; i < this.#list.length; i++) {
            this.#list[i].index.set(i);
        }

        for (let i in this.#watchers) {
            let forLoop = this.#watchers[i];
            forLoop.deleteNode(index);
        }
        this.#closures.forEach((closure) => closure.update());
    }
    clearAll() {
        this.#list = [];
        for (let i in this.#watchers) {
            this.#watchers[i].deleteAllNode();
        }
        this.#closures.forEach((closure) => closure.update());
    }
    pop() {
        this.deleteAt(this.#list.length - 1);
    }
    getClone() {
        let current_list = this.#list;
        let new_list = [];
        for (let idx in current_list) {
            new_list.push(fastn_utils.clone(current_list[idx].item));
        }
        return new MutableList(new_list);
    }
}

fastn.mutable = function (val) {
    return new Mutable(val)
};

fastn.closure = function (func) {
    return new Closure(func);
}

fastn.closureWithoutExecute = function (func) {
    return new Closure(func, false);
}

fastn.formula = function (deps, func) {
    let closure = fastn.closure(func);
    let mutable = new Mutable(closure.get());
    for (let idx in deps) {
        if (fastn_utils.isNull(deps[idx]) || !deps[idx].addClosure) {
            continue;
        }
        deps[idx].addClosure(new Closure(function () {
            closure.update();
            mutable.set(closure.get());
        }));
    }

    return mutable;
}

fastn.proxy = function (targets, differentiator) {
    return new Proxy(targets, differentiator);
};


fastn.wrapMutable = function (obj) {
    if (!(obj instanceof Mutable)
        && !(obj instanceof RecordInstance)
        && !(obj instanceof MutableList)
    ) {
        obj = new Mutable(obj);
    }
    return obj;
}

fastn.mutableList = function (list) {
    return new MutableList(list);
}

class RecordInstance {
    #fields;
    #closures;
    constructor(obj) {
        this.#fields = {};
        this.#closures = [];

        for (let key in obj) {
            if (obj[key] instanceof fastn.mutableClass) {
                this.#fields[key] = fastn.mutable(null)
                this.#fields[key].setWithoutUpdate(obj[key]);
            } else {
                this.#fields[key] = fastn.mutable(obj[key]);
            }
        }
    }
    getAllFields() {
        return this.#fields;
    }
    addClosure(closure) {
        this.#closures.push(closure);
    }
    unlinkNode(node) {
        this.#closures = this.#closures.filter(closure => closure.getNode() !== node);
    }
    get(key) {
        return this.#fields[key];
    }
    set(key, value) {
        if (value === undefined) {
            value = key;
            if (!(value instanceof RecordInstance)) {
                value = new RecordInstance(value);
            }

            let fields = {};
            for(let key in value.#fields) {
                fields[key] = value.#fields[key]
            }

            this.#fields = fields;
        }
        if (this.#fields[key] === undefined) {
            this.#fields[key] = fastn.mutable(null);
            this.#fields[key].setWithoutUpdate(value);
        } else {
            this.#fields[key].set(value);
        }
        this.#closures.forEach((closure) => closure.update());
    }
    setAndReturn(key, value) {
        this.set(key, value);
        return this;
    }
    replace(obj) {
        for (let key in this.#fields) {
            if (!(key in obj.#fields)) {
                throw new Error("RecordInstance.replace: key " + key + " not present in new object");
            }
            this.#fields[key] = fastn.wrapMutable(obj.#fields[key]);
        }
        this.#closures.forEach((closure) => closure.update());
    }
    toObject() {
        return Object.fromEntries(Object.entries(this.#fields).map(([key, value]) => [
            key, 
            fastn_utils.getFlattenStaticValue(value)
        ]));
    }
    getClone() {
        let current_fields = this.#fields;
        let cloned_fields = {};
        for (let key in current_fields) {
            let value = fastn_utils.clone(current_fields[key]);
            if (value instanceof fastn.mutableClass) {
                value = value.get();
            }
            cloned_fields[key] = value;
        }
        return new RecordInstance(cloned_fields);
    }
}

class Module {
    #name;
    #global;
    constructor(name, global) {
        this.#name = name;
        this.#global = global;
    }

    get(function_name) {
        return this.#global[`${this.#name}__${function_name}`];
    }
}

fastn.recordInstance = function (obj) {
    return new RecordInstance(obj);
}

fastn.color = function (r, g, b) {
    return `rgb(${r},${g},${b})`;
}

fastn.mutableClass = Mutable;
fastn.mutableListClass = MutableList;
fastn.recordInstanceClass = RecordInstance;
fastn.module = function (name, global) {
    return new Module(name, global);
}
let fastn_dom = {};

fastn_dom.codeData = {
    availableThemes: {},
    addedCssFile: []
}

fastn_dom.externalCss = new Set();
fastn_dom.externalJs = new Set();

// Todo: Object (key, value) pair (counter type key)
fastn_dom.webComponent = [];

fastn_dom.commentNode = "comment";
fastn_dom.wrapperNode = "wrapper";
fastn_dom.commentMessage = "***FASTN***";
fastn_dom.webComponentArgument = "args";

fastn_dom.classes = { }
fastn_dom.unsanitised_classes = {}
fastn_dom.class_count = 0;
fastn_dom.propertyMap = {
    "align-items": "ali",
    "align-self": "as",
    "background-color": "bgc",
    "background-image": "bgi",
    "background-position": "bgp",
    "background-repeat": "bgr",
    "background-size": "bgs",
    "border-bottom-color": "bbc",
    "border-bottom-left-radius": "bblr",
    "border-bottom-right-radius": "bbrr",
    "border-bottom-style": "bbs",
    "border-bottom-width": "bbw",
    "border-color": "bc",
    "border-left-color": "blc",
    "border-left-style": "bls",
    "border-left-width": "blw",
    "border-radius": "br",
    "border-right-color": "brc",
    "border-right-style": "brs",
    "border-right-width": "brw",
    "border-style": "bs",
    "border-top-color": "btc",
    "border-top-left-radius": "btlr",
    "border-top-right-radius": "btrr",
    "border-top-style": "bts",
    "border-top-width": "btw",
    "border-width": "bw",
    "bottom": "b",
    "color": "c",
    "shadow": "sh",
    "text-shadow": "tsh",
    "cursor": "cur",
    "display": "d",
    "flex-wrap": "fw",
    "font-style": "fst",
    "font-weight": "fwt",
    "gap": "g",
    "height": "h",
    "justify-content": "jc",
    "left": "l",
    "link": "lk",
    "link-color": "lkc",
    "margin": "m",
    "margin-bottom": "mb",
    "margin-horizontal": "mh",
    "margin-left": "ml",
    "margin-right": "mr",
    "margin-top": "mt",
    "margin-vertical": "mv",
    "max-height": "mxh",
    "max-width": "mxw",
    "min-height": "mnh",
    "min-width": "mnw",
    "opacity": "op",
    "overflow": "o",
    "overflow-x": "ox",
    "overflow-y": "oy",
    "object-fit": "of",
    "padding": "p",
    "padding-bottom": "pb",
    "padding-horizontal": "ph",
    "padding-left": "pl",
    "padding-right": "pr",
    "padding-top": "pt",
    "padding-vertical": "pv",
    "position": "pos",
    "resize": "res",
    "role": "rl",
    "right": "r",
    "sticky": "s",
    "text-align": "ta",
    "text-decoration": "td",
    "text-transform": "tt",
    "top": "t",
    "width": "w",
    "z-index": "z",
    "-webkit-box-orient": "wbo",
    "-webkit-line-clamp": "wlc",
};

// dynamic-class-css.md
fastn_dom.getClassesAsString = function() {
    let classes = Object.entries(fastn_dom.classes).map(entry => {
        return getClassAsString(entry[0], entry[1]);
    });

    /*.ft_text {
        padding: 0;
    }*/
    return `<style id="styles">
    ${classes.join("\n\t")}
    </style>`;
}

function getClassAsString(className, obj) {
    if (typeof obj.value === 'object' && obj.value !== null) {
        let value = "";
        for (let key in obj.value) {
            if (obj.value[key] === undefined || obj.value[key] === null) {
                continue
            }
            value = `${value} ${key}: ${obj.value[key]}${key === "color" ? " !important": ""};`
        }
        return `${className} { ${value} }`
    } else {
        return `${className} { ${obj.property}: ${obj.value}${obj.property === "color" ? " !important": ""}; }`;
    }
}

fastn_dom.ElementKind = {
    Row: 0,
    Column: 1,
    Integer: 2,
    Decimal: 3,
    Boolean: 4,
    Text: 5,
    Image: 6,
    IFrame: 7,
    // To create parent for dynamic DOM
    Comment: 8,
    CheckBox: 9,
    TextInput: 10,
    ContainerElement: 11,
    Rive: 12,
    Document: 13,
    Wrapper: 14,
    Code: 15,
    // Note: This is called internally, it gives `code` as tagName. This is used
    // along with the Code: 15.
    CodeChild: 16,
    // Note: 'arguments' cant be used as function parameter name bcoz it has
    // internal usage in js functions.
    WebComponent: (webcomponent, args) => { return [17, [webcomponent, args]]; },
    Video: 18,
};

fastn_dom.PropertyKind = {
    Color: 0,
    IntegerValue: 1,
    StringValue: 2,
    DecimalValue: 3,
    BooleanValue: 4,
    Width: 5,
    Padding: 6,
    Height: 7,
    Id: 8,
    BorderWidth: 9,
    BorderStyle: 10,
    Margin: 11,
    Background: 12,
    PaddingHorizontal: 13,
    PaddingVertical: 14,
    PaddingLeft: 15,
    PaddingRight: 16,
    PaddingTop: 17,
    PaddingBottom: 18,
    MarginHorizontal: 19,
    MarginVertical: 20,
    MarginLeft: 21,
    MarginRight: 22,
    MarginTop: 23,
    MarginBottom: 24,
    Role: 25,
    ZIndex: 26,
    Sticky: 27,
    Top: 28,
    Bottom: 29,
    Left: 30,
    Right: 31,
    Overflow: 32,
    OverflowX: 33,
    OverflowY: 34,
    Spacing: 35,
    Wrap: 36,
    TextTransform: 37,
    TextIndent: 38,
    TextAlign: 39,
    LineClamp: 40,
    Opacity: 41,
    Cursor: 42,
    Resize: 43,
    MinHeight: 44,
    MaxHeight: 45,
    MinWidth: 46,
    MaxWidth: 47,
    WhiteSpace: 48,
    BorderTopWidth: 49,
    BorderBottomWidth: 50,
    BorderLeftWidth: 51,
    BorderRightWidth: 52,
    BorderRadius: 53,
    BorderTopLeftRadius: 54,
    BorderTopRightRadius: 55,
    BorderBottomLeftRadius: 56,
    BorderBottomRightRadius: 57,
    BorderStyleVertical: 58,
    BorderStyleHorizontal: 59,
    BorderLeftStyle: 60,
    BorderRightStyle: 61,
    BorderTopStyle: 62,
    BorderBottomStyle: 63,
    BorderColor: 64,
    BorderLeftColor: 65,
    BorderRightColor: 66,
    BorderTopColor: 67,
    BorderBottomColor: 68,
    AlignSelf: 69,
    Classes: 70,
    Anchor: 71,
    Link: 72,
    Children: 73,
    OpenInNewTab: 74,
    TextStyle: 75,
    Region: 76,
    AlignContent: 77,
    Display: 78,
    Checked: 79,
    Enabled: 80,
    TextInputType: 81,
    Placeholder: 82,
    Multiline: 83,
    DefaultTextInputValue: 84,
    Loading: 85,
    Src: 86,
    YoutubeSrc: 87,
    Code: 88,
    ImageSrc: 89,
    Alt: 90,
    DocumentProperties: {
        MetaTitle: 91,
        MetaOGTitle: 92,
        MetaTwitterTitle: 93,
        MetaDescription: 94,
        MetaOGDescription: 95,
        MetaTwitterDescription: 96,
        MetaOGImage: 97,
        MetaTwitterImage: 98,
        MetaThemeColor: 99,
    },
    Shadow: 100,
    CodeTheme: 101,
    CodeLanguage: 102,
    CodeShowLineNumber: 103,
    Css: 104,
    Js: 105,
    LinkRel: 106,
    InputMaxLength: 107,
    Favicon: 108,
    Fit: 109,
    VideoSrc: 110,
    Autoplay: 111,
    Poster: 112,
    LoopVideo: 113,
    Controls: 114,
    Muted: 115,
    LinkColor: 116,
    TextShadow: 117,
};



fastn_dom.Loading = {
    Lazy: "lazy",
    Eager: "eager",
}

fastn_dom.LinkRel = {
    NoFollow: "nofollow",
    Sponsored: "sponsored",
    Ugc: "ugc",
}

fastn_dom.TextInputType = {
    Text: "text",
    Email: "email",
    Password: "password",
    Url: "url",
    DateTime: "datetime",
    Date: "date",
    Time: "time",
    Month: "month",
    Week: "week",
    Color: "color",
    File: "file",
}

fastn_dom.AlignContent = {
    TopLeft: "top-left",
    TopCenter: "top-center",
    TopRight: "top-right",
    Right: "right",
    Left: "left",
    Center: "center",
    BottomLeft: "bottom-left",
    BottomRight: "bottom-right",
    BottomCenter: "bottom-center",
}

fastn_dom.Region = {
    H1: "h1",
    H2: "h2",
    H3: "h3",
    H4: "h4",
    H5: "h5",
    H6: "h6",
}

fastn_dom.Anchor = {
    Window: [1, "fixed"],
    Parent: [2, "absolute"],
    Id: (value) => { return [3, value]; },
}

fastn_dom.DeviceData = {
    Desktop: "desktop",
    Mobile: "mobile",
}

fastn_dom.TextStyle = {
    Underline: "underline",
    Italic: "italic",
    Strike: "line-through",
    Heavy: "900",
    Extrabold: "800",
    Bold: "700",
    SemiBold: "600",
    Medium: "500",
    Regular: "400",
    Light: "300",
    ExtraLight: "200",
    Hairline: "100",
}

fastn_dom.Resizing = {
    FillContainer: "100%",
    HugContent: "fit-content",
    Auto: "auto",
    Fixed: (value) => { return value; }
}

fastn_dom.Spacing = {
    SpaceEvenly: [1, "space-evenly"],
    SpaceBetween: [2, "space-between"],
    SpaceAround: [3, "space-around"],
    Fixed: (value) => { return [4, value]; }
}


fastn_dom.BorderStyle = {
    Solid: "solid",
    Dashed: "dashed",
    Dotted: "dotted",
    Double: "double",
    Ridge: "ridge",
    Groove: "groove",
    Inset: "inset",
    Outset: "outset",
}

fastn_dom.Fit = {
    none: "none",
    fill: "fill",
    contain: "contain",
    cover: "cover",
    scaleDown: "scale-down",
}

fastn_dom.Overflow = {
    Scroll: "scroll",
    Visible: "visible",
    Hidden: "hidden",
    Auto: "auto",
}

fastn_dom.Display = {
    Block: "block",
    Inline: "inline",
    InlineBlock: "inline-block",
}

fastn_dom.AlignSelf = {
    Start: "start",
    Center: "center",
    End: "end",
}

fastn_dom.TextTransform = {
    None: "none",
    Capitalize: "capitalize",
    Uppercase: "uppercase",
    Lowercase: "lowercase",
    Inherit: "inherit",
    Initial: "initial",
}

fastn_dom.TextAlign = {
    Start: "start",
    Center: "center",
    End: "end",
    Justify: "justify",
}

fastn_dom.Cursor = {
    None: "none",
    Default: "default",
    ContextMenu: "context-menu",
    Help: "help",
    Pointer: "pointer",
    Progress: "progress",
    Wait: "wait",
    Cell: "cell",
    CrossHair: "crosshair",
    Text: "text",
    VerticalText: "vertical-text",
    Alias: "alias",
    Copy: "copy",
    Move: "move",
    NoDrop: "no-drop",
    NotAllowed: "not-allowed",
    Grab: "grab",
    Grabbing: "grabbing",
    EResize: "e-resize",
    NResize: "n-resize",
    NeResize: "ne-resize",
    SResize: "s-resize",
    SeResize: "se-resize",
    SwResize: "sw-resize",
    Wresize: "w-resize",
    Ewresize: "ew-resize",
    NsResize: "ns-resize",
    NeswResize: "nesw-resize",
    NwseResize: "nwse-resize",
    ColResize: "col-resize",
    RowResize: "row-resize",
    AllScroll: "all-scroll",
    ZoomIn: "zoom-in",
    ZoomOut: "zoom-out"
}

fastn_dom.Resize = {
    Vertical: "vertical",
    Horizontal: "horizontal",
    Both: "both",
}

fastn_dom.WhiteSpace = {
    Normal: "normal",
    NoWrap: "nowrap",
    Pre: "pre",
    PreLine: "pre-line",
    PreWrap: "pre-wrap",
    BreakSpaces: "break-spaces",
}



fastn_dom.BackgroundStyle = {
    Solid: (value) => {
        return [1, value];
    },
    Image: (value) => {
        return [2, value];
    },
    LinearGradient: (value) => {
        return [3, value];
    },
}

fastn_dom.BackgroundRepeat = {
    Repeat: "repeat",
    RepeatX: "repeat-x",
    RepeatY: "repeat-y",
    NoRepeat: "no-repeat",
    Space: "space",
    Round: "round",
}

fastn_dom.BackgroundSize = {
    Auto: "auto",
    Cover: "cover",
    Contain: "contain",
    Length: (value) => { return value; },
}

fastn_dom.BackgroundPosition = {
    Left: "left",
    Right: "right",
    Center: "center",
    LeftTop: "left top",
    LeftCenter: "left center",
    LeftBottom: "left bottom",
    CenterTop: "center top",
    CenterCenter: "center center",
    CenterBottom: "center bottom",
    RightTop: "right top",
    RightCenter: "right center",
    RightBottom: "right bottom",
    Length: (value) => { return value; },
}

fastn_dom.LinearGradientDirection = {
    Angle: (value) => { return `${value}deg`; },
    Turn: (value) => { return `${value}turn`; },
    Left: "270deg",
    Right: "90deg",
    Top: "0deg",
    Bottom: "180deg",
    TopLeft: "315deg",
    TopRight: "45deg",
    BottomLeft: "225deg",
    BottomRight: "135deg",
}

fastn_dom.FontSize = {
    Px: (value) => {
        if (value instanceof fastn.mutableClass) {
            return fastn.formula([value], function () { return `${value.get()}px`})
        }
        return `${value}px`;
    },
    Em: (value) => {
        if (value instanceof fastn.mutableClass) {
            return fastn.formula([value], function () { return `${value.get()}em`})
        }
        return `${value}em`;
    },
    Rem: (value) => {
        if (value instanceof fastn.mutableClass) {
            return fastn.formula([value], function () { return `${value.get()}rem`})
        }
        return `${value}rem`;
    },
}

fastn_dom.Length = {
    Px: (value) => {
        if (value instanceof fastn.mutableClass) {
            return fastn.formula([value], function () { return `${value.get()}px`})
        }
        return `${value}px`;
    },
    Em: (value) => {
        if (value instanceof fastn.mutableClass) {
            return fastn.formula([value], function () { return `${value.get()}em`})
        }
        return `${value}em`;
    },
    Rem: (value) => {
        if (value instanceof fastn.mutableClass) {
            return fastn.formula([value], function () { return `${value.get()}rem`})
        }
        return `${value}rem`;
    },
    Percent: (value) => {
        if (value instanceof fastn.mutableClass) {
            return fastn.formula([value], function () { return `${value.get()}%`})
        }
        return `${value}%`;
    },
    Calc: (value) => {
        if (value instanceof fastn.mutableClass) {
            return fastn.formula([value], function () { return `calc(${value.get()})`})
        }
        return `calc(${value})`;
    },
    Vh: (value) => {
        if (value instanceof fastn.mutableClass) {
            return fastn.formula([value], function () { return `${value.get()}vh`})
        }
        return `${value}vh`;
    },
    Vw: (value) => {
        if (value instanceof fastn.mutableClass) {
            return fastn.formula([value], function () { return `${value.get()}vw`})
        }
        return `${value}vw`;
    },
    Vmin: (value) => {
        if (value instanceof fastn.mutableClass) {
            return fastn.formula([value], function () { return `${value.get()}vmin`})
        }
        return `${value}vmin`;
    },
    Vmax: (value) => {
        if (value instanceof fastn.mutableClass) {
            return fastn.formula([value], function () { return `${value.get()}vmax`})
        }
        return `${value}vmax`;
    },
    Responsive: (length) => {
        return new PropertyValueAsClosure(
            () => {
                if (ftd.device.get() === "desktop") {
                    return length.get("desktop");
                } else {
                    let mobile = length.get("mobile");
                    let desktop = length.get("desktop");
                    return mobile ? mobile: desktop;
                }
            },
            [ftd.device, length]
        );
    }
}



fastn_dom.Event = {
    Click: 0,
    MouseEnter: 1,
    MouseLeave: 2,
    ClickOutside: 3,
    GlobalKey: (val) => {return [4, val];},
    GlobalKeySeq: (val) => {return [5, val];},
    Input: 6,
    Change: 7,
    Blur: 8,
    Focus: 9,
}

class PropertyValueAsClosure {
    closureFunction;
    deps;
    constructor(closureFunction, deps) {
        this.closureFunction = closureFunction;
        this.deps = deps;
    }
}

// Node2 -> Intermediate node
// Node -> similar to HTML DOM node (Node2.#node)
class Node2 {
    #node;
    #kind;
    #parent;
    #tagName;
    #rawInnerValue;
    /**
     * This is where we store all the attached closures, so we can free them
     * when we are done.
     */
    #mutables;
    /**
     * This is where we store the extraData related to node. This is
     * especially useful to store data for integrated external library (like
     * rive).
     */
    #extraData;
    #children;
    constructor(parentOrSibiling, kind) {
        this.#kind = kind;
        this.#parent = parentOrSibiling;
        this.#children = [];
        this.#rawInnerValue = null;

        let sibiling = undefined;

        if (parentOrSibiling instanceof ParentNodeWithSibiling) {
            this.#parent = parentOrSibiling.getParent();
            while(this.#parent instanceof ParentNodeWithSibiling) {
                this.#parent = this.#parent.getParent();
            }
            sibiling = parentOrSibiling.getSibiling();
        }

        this.createNode(kind);

        this.#mutables = [];
        this.#extraData = {};
        /*if (!!parent.parent) {
            parent = parent.parent();
        }*/


        if (this.#parent.getNode) {
            this.#parent = this.#parent.getNode();
        }

        if (fastn_utils.isWrapperNode(this.#tagName)) {
            this.#parent = parentOrSibiling;
            return;
        }
        if (sibiling) {
            this.#parent.insertBefore(this.#node, fastn_utils.nextSibling(sibiling, this.#parent));
        } else {
            this.#parent.appendChild(this.#node);
        }
    }
    createNode(kind) {
        if (kind === fastn_dom.ElementKind.Code) {
            let [node, classes, attributes] = fastn_utils.htmlNode(kind);
            [this.#tagName, this.#node] = fastn_utils.createNodeHelper(node, classes, attributes);
            let codeNode = new Node2(this.#node, fastn_dom.ElementKind.CodeChild);
            this.#children.push(codeNode);
        } else {
            let [node, classes, attributes] = fastn_utils.htmlNode(kind);
            [this.#tagName, this.#node] = fastn_utils.createNodeHelper(node, classes, attributes);
        }
    }
    getTagName(){
        return this.#tagName;
    }
    getParent() {
        return this.#parent;
    }
    removeAllFaviconLinks() {
        if (hydrating) {
            const links = document.head.querySelectorAll('link[rel="shortcut icon"]');
            links.forEach( link => {
                link.parentNode.removeChild(link);
            });
        }
    }

    setFavicon(url) {
        if (hydrating) {
            if (url instanceof fastn.recordInstanceClass) url = url.get('src');
            while (true) {
                if (url instanceof fastn.mutableClass) url = url.get();
                else break;
            }

            let link_element = document.createElement("link");
            link_element.rel = "shortcut icon";
            link_element.href = url;

            this.removeAllFaviconLinks();
            document.head.appendChild(link_element);
        }
    }
    // for attaching inline attributes
    attachAttribute(property, value) {
        // If the value is null, undefined, or false, the attribute will be removed.
        // For example, if attributes like checked, muted, or autoplay have been assigned a "false" value.
        if (fastn_utils.isNull(value)) {
            this.#node.removeAttribute(property);
            return;
        }
        this.#node.setAttribute(property, value);
    }
    removeAttribute(property) {
        this.#node.removeAttribute(property);
    }
    updateTagName(name) {
        if (ssr) {
            this.#node.updateTagName(name);
        }
    }
    updateToAnchor(url) {
        let node_kind = this.#kind;
        if (ssr) {
            if (node_kind !== fastn_dom.ElementKind.Image) {
                this.updateTagName('a');
                this.attachAttribute("href", url);
            }
            return;
        }
        if (node_kind === fastn_dom.ElementKind.Image) {
            let anchorElement = document.createElement("a");
            anchorElement.href = url;
            anchorElement.appendChild(this.#node);
            this.#parent.appendChild(anchorElement);
            this.#node = anchorElement;
        } else {
            let anchorElement = document.createElement("a");
            anchorElement.href = url;
            anchorElement.innerHTML = this.#node.innerHTML;
            anchorElement.className = this.#node.className;
            anchorElement.style = this.#node.style;
            for (var i = 0; i < this.#node.attributes.length; i++) {
                var attr = this.#node.attributes[i];
                anchorElement.setAttribute(attr.name, attr.value);
            }
            var eventListeners = fastn_utils.getEventListeners(this.#node);
            for (var eventType in eventListeners) {
                anchorElement[eventType] = eventListeners[eventType];
            }
            this.#parent.replaceChild(anchorElement, this.#node);
            this.#node = anchorElement;
        }
    }
    updatePositionForNodeById(node_id, value) {
        if (!ssr) {
            const target_node = document.querySelector(`[id="${node_id}"]`);
            if (!fastn_utils.isNull(target_node))
                target_node.style['position'] = value;
        }
    }
    updateParentPosition(value) {
        if (ssr) {
            let parent = this.#parent;
            if (parent.style) parent.style["position"] = value;
        }
        if (!ssr) {
            let current_node = this.#node;
            if (current_node) {
                let parent_node = current_node.parentNode;
                parent_node.style['position'] = value;
            }
        }
    }
    updateMetaTitle(value) {
        if (!ssr && hydrating) {
            if (!fastn_utils.isNull(value)) window.document.title = value;
        }
    }
    addMetaTagByName(name, value) {
        if (value === null || value === undefined) {
            this.removeMetaTagByName(name);
            return;
        }
        if (!ssr && hydrating) {
            const metaTag = window.document.createElement('meta');
            metaTag.setAttribute('name', name);
            metaTag.setAttribute('content', value);
            document.head.appendChild(metaTag);
        }
    }
    addMetaTagByProperty(property, value) {
        if (value === null || value === undefined) {
            this.removeMetaTagByProperty(property);
            return;
        }
        if (!ssr && hydrating) {
            const metaTag = window.document.createElement('meta');
            metaTag.setAttribute('property', property);
            metaTag.setAttribute('content', value);
            document.head.appendChild(metaTag);
        }
    }
    removeMetaTagByName(name) {
        if (!ssr && hydrating) {
            const metaTags = document.getElementsByTagName('meta');
            for (let i = 0; i < metaTags.length; i++) {
                const metaTag = metaTags[i];
                if (metaTag.getAttribute('name') === name) {
                    metaTag.remove();
                    break;
                }
            }
        }
    }
    removeMetaTagByProperty(property) {
        if (!ssr && hydrating) {
            const metaTags = document.getElementsByTagName('meta');
            for (let i = 0; i < metaTags.length; i++) {
                const metaTag = metaTags[i];
                if (metaTag.getAttribute('property') === property) {
                    metaTag.remove();
                    break;
                }
            }
        }
    }
    // dynamic-class-css
    attachCss(property, value, createClass, className) {
        let propertyShort = fastn_dom.propertyMap[property] || property;
        propertyShort = `__${propertyShort}`;
        let cls = `${propertyShort}-${JSON.stringify(fastn_dom.class_count)}`;
        if (!!className) {
           cls = className;
        } else {
            if (!fastn_dom.unsanitised_classes[cls]) {
                fastn_dom.unsanitised_classes[cls] = ++fastn_dom.class_count;
            }
            cls = `${propertyShort}-${fastn_dom.unsanitised_classes[cls]}`;
        }
        let cssClass = className ? cls : `.${cls}`;

        const obj = { property, value };

        if (value === undefined) {
            if (!ssr && !hydrating) {
                for (const className of this.#node.classList.values()) {
                    if (className.startsWith(`${propertyShort}-`)) {
                        this.#node.classList.remove(className);
                    }
                }
                this.#node.style[property] = null;
            }
            return cls;
        }

        if (!ssr && !hydrating) {
            if (!!className) {
                if (!fastn_dom.classes[cssClass]) {
                    fastn_dom.classes[cssClass] = fastn_dom.classes[cssClass] || obj;
                    let styles = document.getElementById('styles');
                    styles.innerHTML = `${styles.innerHTML}${getClassAsString(cssClass, obj)}\n`;
                }
                return cls;
            }

            for (const className of this.#node.classList.values()) {
                if (className.startsWith(`${propertyShort}-`)) {
                    this.#node.classList.remove(className);
                }
            }

            if (createClass) {
                if (!fastn_dom.classes[cssClass]) {
                    fastn_dom.classes[cssClass] = fastn_dom.classes[cssClass] || obj;
                    let styles = document.getElementById('styles');
                    styles.innerHTML = `${styles.innerHTML}${getClassAsString(cssClass, obj)}\n`;
                }
                this.#node.style.removeProperty(property);
                this.#node.classList.add(cls);
            } else if (!fastn_dom.classes[cssClass]) {
                if (typeof value === 'object' && value !== null) {
                    for (let key in value) {
                        this.#node.style[key] = value[key];
                    }
                } else {
                    this.#node.style[property] = value;
                }
            } else {
                this.#node.style.removeProperty(property);
                this.#node.classList.add(cls);
            }

            return cls;
        }

        fastn_dom.classes[cssClass] = fastn_dom.classes[cssClass] || obj;

        if (!!className) {
            return cls;
        }

        this.#node.classList.add(cls);
        return cls;
    }
    attachShadow(value) {
        if (fastn_utils.isNull(value)) {
            this.attachCss("box-shadow", value);
            return;
        }

        const color = value.get("color");

        const lightColor = fastn_utils.getStaticValue(color.get("light"));
        const darkColor = fastn_utils.getStaticValue(color.get("dark"));

        const blur = fastn_utils.getStaticValue(value.get("blur"));
        const xOffset = fastn_utils.getStaticValue(value.get("x_offset"));
        const yOffset = fastn_utils.getStaticValue(value.get("y_offset"));
        const spread = fastn_utils.getStaticValue(value.get("spread"));
        const inset = fastn_utils.getStaticValue(value.get("inset"));

        const shadowCommonCss = `${inset ? "inset " : ""}${xOffset} ${yOffset} ${blur} ${spread}`;
        const lightShadowCss =  `${shadowCommonCss} ${lightColor}`;
        const darkShadowCss = `${shadowCommonCss} ${darkColor}`;

        if (lightShadowCss === darkShadowCss) {
            this.attachCss("box-shadow", lightShadowCss, false);
        } else {
            let lightClass = this.attachCss("box-shadow", lightShadowCss, true);
            this.attachCss("box-shadow", darkShadowCss, true, `body.dark .${lightClass}`);
        }
    }
    attachTextShadow(value) {
        if (fastn_utils.isNull(value)) {
            this.attachCss("text-shadow", value);
            return;
        }

        const color = value.get("color");

        const lightColor = fastn_utils.getStaticValue(color.get("light"));
        const darkColor = fastn_utils.getStaticValue(color.get("dark"));

        const blur = fastn_utils.getStaticValue(value.get("blur"));
        const xOffset = fastn_utils.getStaticValue(value.get("x_offset"));
        const yOffset = fastn_utils.getStaticValue(value.get("y_offset"));

        const shadowCommonCss = `${xOffset} ${yOffset} ${blur}`;
        const lightShadowCss =  `${shadowCommonCss} ${lightColor}`;
        const darkShadowCss = `${shadowCommonCss} ${darkColor}`;

        if (lightShadowCss === darkShadowCss) {
            this.attachCss("text-shadow", lightShadowCss, false);
        } else {
            let lightClass = this.attachCss("box-shadow", lightShadowCss, true);
            this.attachCss("text-shadow", darkShadowCss, true, `body.dark .${lightClass}`);
        }
    }
    attachLinearGradientCss(value) {
        if (fastn_utils.isNull(value)) {
            this.attachCss("background-image", value);
            return;
        }
        var lightGradientString = "";
        var darkGradientString = "";

        let colorsList = value.get("colors").get().getList();
        let direction = fastn_utils.getStaticValue(value.get("direction"));
        colorsList.map(function (element) {
            // LinearGradient RecordInstance
            let lg_color = element.item;

            let color = lg_color.get("color").get();
            let lightColor = fastn_utils.getStaticValue(color.get("light"));
            let darkColor = fastn_utils.getStaticValue(color.get("dark"));

            lightGradientString = `${lightGradientString} ${lightColor}`;
            darkGradientString = `${darkGradientString} ${darkColor}`;

            let start = fastn_utils.getStaticValue(lg_color.get("start"));
            if (start !== undefined && start !== null ) {
                lightGradientString = `${lightGradientString} ${start}`;
                darkGradientString = `${darkGradientString} ${start}`;
            }

            let end = fastn_utils.getStaticValue(lg_color.get("end"));
            if (end !== undefined && end !== null ) {
                lightGradientString = `${lightGradientString} ${end}`;
                darkGradientString = `${darkGradientString} ${end}`;
            }

            let stop_position = fastn_utils.getStaticValue(lg_color.get("stop_position"));
            if (stop_position !== undefined && stop_position !== null ) {
                lightGradientString = `${lightGradientString}, ${stop_position}`;
                darkGradientString = `${darkGradientString}, ${stop_position}`;
            }

            lightGradientString = `${lightGradientString},`
            darkGradientString = `${darkGradientString},`
        });

        lightGradientString = lightGradientString.trim().slice(0, -1);
        darkGradientString = darkGradientString.trim().slice(0, -1);

        if (lightGradientString === darkGradientString) {
            this.attachCss("background-image", `linear-gradient(${direction}, ${lightGradientString})`, false);
        } else {
            let lightClass = this.attachCss("background-image", `linear-gradient(${direction}, ${lightGradientString})`,true);
            this.attachCss("background-image", `linear-gradient(${direction}, ${darkGradientString})`, true, `body.dark .${lightClass}`);
        }
    }
    attachBackgroundImageCss(value) {
        if (fastn_utils.isNull(value)) {
            this.attachCss("background-repeat", value);
            this.attachCss("background-position", value);
            this.attachCss("background-size", value);
            this.attachCss("background-image", value);
            return;
        }

        let src = fastn_utils.getStaticValue(value.get("src"));
        let lightValue = fastn_utils.getStaticValue(src.get("light"));
        let darkValue = fastn_utils.getStaticValue(src.get("dark"));

        let position = fastn_utils.getStaticValue(value.get("position"));
        let positionX = null;
        let positionY = null;
        if (position !== null && position instanceof Object) {
            positionX = fastn_utils.getStaticValue(position.get("x"));
            positionY = fastn_utils.getStaticValue(position.get("y"));

            if (positionX !== null) position = `${positionX}`;
            if (positionY !== null) {
                if (positionX === null) position = `0px ${positionY}`;
                else position = `${position} ${positionY}`;
            }
        }
        let repeat = fastn_utils.getStaticValue(value.get("repeat"));
        let size = fastn_utils.getStaticValue(value.get("size"));
        let sizeX = null;
        let sizeY = null;
        if (size !== null && size instanceof Object) {
            sizeX = fastn_utils.getStaticValue(size.get("x"));
            sizeY = fastn_utils.getStaticValue(size.get("y"));

            if (sizeX !== null) size = `${sizeX}`;
            if (sizeY !== null) {
                if (sizeX === null) size = `0px ${sizeY}`;
                else size = `${size} ${sizeY}`;
            }
        }

        if (repeat !== null) this.attachCss("background-repeat", repeat);
        if (position !== null) this.attachCss("background-position", position);
        if (size !== null)  this.attachCss("background-size", size);

        if (lightValue === darkValue) {
            this.attachCss("background-image", `url(${lightValue})`, false);
        } else {
            let lightClass = this.attachCss("background-image", `url(${lightValue})`, true);
            this.attachCss("background-image", `url(${darkValue})`, true, `body.dark .${lightClass}`);
        }
    }
    attachExternalCss(css) {
        if (hydrating) {
            let css_tag = document.createElement('link');
            css_tag.rel = 'stylesheet';
            css_tag.type = 'text/css';
            css_tag.href = css;

            let head = document.head || document.getElementsByTagName("head")[0];
            if (!fastn_dom.externalCss.has(css)){
                head.appendChild(css_tag);
                fastn_dom.externalCss.add(css);
            }
        }
    }
    attachExternalJs(js) {
        if (hydrating) {
            let js_tag = document.createElement('script');
            js_tag.src = js;

            let head = document.head || document.getElementsByTagName("head")[0];
            if (!fastn_dom.externalJs.has(js)){
                head.appendChild(js_tag);
                fastn_dom.externalCss.add(js);
            }
        }
    }
    attachColorCss(property, value, visited) {
        if (fastn_utils.isNull(value)) {
            this.attachCss(property, value);
            return;
        }
        let lightValue = fastn_utils.getStaticValue(value.get("light"));
        let darkValue = fastn_utils.getStaticValue(value.get("dark"));
        if (lightValue === darkValue) {
            this.attachCss(property, lightValue, false);
        } else {
            let lightClass = this.attachCss(property, lightValue, true);
            this.attachCss(property, darkValue, true, `body.dark .${lightClass}`);
            if (visited) {
                this.attachCss(property, lightValue, true, `.${lightClass}:visited`);
                this.attachCss(property, darkValue, true, `body.dark  .${lightClass}:visited`);
            }
        }
    }
    attachRoleCss(value) {
        if (fastn_utils.isNull(value)) {
            this.attachCss('role', value);
            return;
        }
        let desktopValue = fastn_utils.getStaticValue(value.get("desktop"));
        let mobileValue = fastn_utils.getStaticValue(value.get("mobile"));
        if (fastn_utils.sameResponsiveRole(desktopValue, mobileValue)) {
            this.attachCss("role", fastn_utils.getRoleValues(desktopValue), true);
        } else {
            let desktopClass = this.attachCss("role", fastn_utils.getRoleValues(desktopValue), true);
            this.attachCss("role", fastn_utils.getRoleValues(mobileValue), true, `body.mobile .${desktopClass}`);
        }
    }
    attachTextStyles(styles) {
        if (fastn_utils.isNull(styles)) {
            this.attachCss('font-style', styles);
            this.attachCss('font-weight', styles);
            this.attachCss('text-decoration', styles);
            return;
        }
        for (var s of styles) {
            switch (s) {
              case 'italic':
                this.attachCss("font-style", s);
                break;
              case 'underline':
              case 'line-through':
                this.attachCss("text-decoration", s);
                break;
              default:
                this.attachCss("font-weight", s);
            }
        }
    }
    attachAlignContent(value, node_kind) {
        if (fastn_utils.isNull(value)) {
            this.attachCss('align-items', value);
            this.attachCss("justify-content", value);
            return;
        }
        if (node_kind === fastn_dom.ElementKind.Column) {
            switch (value) {
                case 'top-left':
                    this.attachCss("justify-content", "start");
                    this.attachCss("align-items", "start");
                    break;
                case 'top-center':
                    this.attachCss("justify-content", "start");
                    this.attachCss("align-items", "center");
                    break;
                case 'top-right':
                    this.attachCss("justify-content", "start");
                    this.attachCss("align-items", "end");
                    break;
                case 'left':
                    this.attachCss("justify-content", "center");
                    this.attachCss("align-items", "start");
                    break;
                case 'center':
                    this.attachCss("justify-content", "center");
                    this.attachCss("align-items", "center");
                    break;
                case 'right':
                    this.attachCss("justify-content", "center");
                    this.attachCss("align-items", "end");
                    break;
                case 'bottom-left':
                    this.attachCss("justify-content", "end");
                    this.attachCss("align-items", "left");
                    break;
                case 'bottom-center':
                    this.attachCss("justify-content", "end");
                    this.attachCss("align-items", "center");
                    break;
                case 'bottom-right':
                    this.attachCss("justify-content", "end");
                    this.attachCss("align-items", "end");
                    break;
            }
        }

        if (node_kind === fastn_dom.ElementKind.Row) {
            switch (value) {
                case 'top-left':
                    this.attachCss("justify-content", "start");
                    this.attachCss("align-items", "start");
                    break;
                case 'top-center':
                    this.attachCss("justify-content", "center");
                    this.attachCss("align-items", "start");
                    break;
                case 'top-right':
                    this.attachCss("justify-content", "end");
                    this.attachCss("align-items", "start");
                    break;
                case 'left':
                    this.attachCss("justify-content", "start");
                    this.attachCss("align-items", "center");
                    break;
                case 'center':
                    this.attachCss("justify-content", "center");
                    this.attachCss("align-items", "center");
                    break;
                case 'right':
                    this.attachCss("justify-content", "right");
                    this.attachCss("align-items", "center");
                    break;
                case 'bottom-left':
                    this.attachCss("justify-content", "start");
                    this.attachCss("align-items", "end");
                    break;
                case 'bottom-center':
                    this.attachCss("justify-content", "center");
                    this.attachCss("align-items", "end");
                    break;
                case 'bottom-right':
                    this.attachCss("justify-content", "end");
                    this.attachCss("align-items", "end");
                    break;
            }
        }
    }
    attachLinkColor(value) {
        ftd.dark_mode.addClosure(fastn.closure(() => {
            if (!ssr) {
                const anchors = this.#node.tagName.toLowerCase() === 'a'
                    ? [this.#node]
                    : Array.from(this.#node.querySelectorAll("a"));
                let propertyShort = `__${fastn_dom.propertyMap["link-color"]}`;

                if(fastn_utils.isNull(value)) {
                    anchors.forEach(a => {
                        a.classList.values().forEach(className => {
                            if(className.startsWith(`${propertyShort}-`)) {
                                a.classList.remove(className);
                            }
                        });
                    });
                } else {
                    const lightValue = fastn_utils.getStaticValue(value.get("light"));
                    const darkValue = fastn_utils.getStaticValue(value.get("dark"));
                    let cls = `${propertyShort}-${JSON.stringify(lightValue)}`;
                    
                    if (!fastn_dom.unsanitised_classes[cls]) {
                        fastn_dom.unsanitised_classes[cls] = ++fastn_dom.class_count;
                    }

                    cls = `${propertyShort}-${fastn_dom.unsanitised_classes[cls]}`;

                    const cssClass = `.${cls}`;

                    if (!fastn_dom.classes[cssClass]) {
                        const obj = { property: "color", value: lightValue };
                        fastn_dom.classes[cssClass] = fastn_dom.classes[cssClass] || obj;
                        let styles = document.getElementById('styles');
                        styles.innerHTML = `${styles.innerHTML}${getClassAsString(cssClass, obj)}\n`;
                    }

                    if(lightValue !== darkValue) {
                        const obj = { property: "color", value: darkValue };
                        let darkCls = `body.dark ${cssClass}`;
                        if (!fastn_dom.classes[darkCls]) {
                            fastn_dom.classes[darkCls] = fastn_dom.classes[darkCls] || obj;
                            let styles = document.getElementById('styles');
                            styles.innerHTML = `${styles.innerHTML}${getClassAsString(darkCls, obj)}\n`;
                        }
                    }

                    anchors.forEach(a => a.classList.add(cls));
                }
            }
        }).addNodeProperty(this, null, inherited));
        this.#mutables.push(ftd.dark_mode);
    }
    setStaticProperty(kind, value, inherited) {
        // value can be either static or mutable
        let staticValue = fastn_utils.getStaticValue(value);
        if (kind === fastn_dom.PropertyKind.Children) {
            if (fastn_utils.isWrapperNode(this.#tagName)) {
                let parentWithSibiling = this.#parent;
                if (Array.isArray(staticValue)) {
                    staticValue.forEach((func, index) => {
                        if (index !== 0) {
                            parentWithSibiling = new ParentNodeWithSibiling(this.#parent.getParent(), this.#children[index-1]);
                        }
                        this.#children.push(fastn_utils.getStaticValue(func.item)(parentWithSibiling, inherited))
                    });
                } else {
                    this.#children.push(staticValue(parentWithSibiling, inherited));
                }
            } else {
                if (Array.isArray(staticValue)) {
                    staticValue.forEach(func =>
                        this.#children.push(fastn_utils.getStaticValue(func.item)(this, inherited)));
                } else {
                    this.#children.push(staticValue(this, inherited));
                }
            }
        } else if (kind === fastn_dom.PropertyKind.Id) {
            this.#node.id = staticValue;
        } else if (kind === fastn_dom.PropertyKind.Css) {
            let css_list = staticValue.map(obj => fastn_utils.getStaticValue(obj.item));
            css_list.forEach((css) => {
                this.attachExternalCss(css);
            });
        } else if (kind === fastn_dom.PropertyKind.Js) {
            let js_list = staticValue.map(obj => fastn_utils.getStaticValue(obj.item));
            js_list.forEach((js) => {
                this.attachExternalJs(js);
            });
        } else if (kind === fastn_dom.PropertyKind.Width) {
            this.attachCss("width", staticValue);
        } else if (kind === fastn_dom.PropertyKind.Height) {
            fastn_utils.resetFullHeight();
            this.attachCss("height", staticValue);
            fastn_utils.setFullHeight();
        } else if (kind === fastn_dom.PropertyKind.Padding) {
            this.attachCss("padding", staticValue);
        } else if (kind === fastn_dom.PropertyKind.PaddingHorizontal) {
            this.attachCss("padding-left", staticValue);
            this.attachCss("padding-right", staticValue);
        } else if (kind === fastn_dom.PropertyKind.PaddingVertical) {
            this.attachCss("padding-top", staticValue);
            this.attachCss("padding-bottom", staticValue);
        } else if (kind === fastn_dom.PropertyKind.PaddingLeft) {
            this.attachCss("padding-left", staticValue);
        } else if (kind === fastn_dom.PropertyKind.PaddingRight) {
            this.attachCss("padding-right", staticValue);
        } else if (kind === fastn_dom.PropertyKind.PaddingTop) {
            this.attachCss("padding-top", staticValue);
        } else if (kind === fastn_dom.PropertyKind.PaddingBottom) {
            this.attachCss("padding-bottom", staticValue);
        } else if (kind === fastn_dom.PropertyKind.Margin) {
            this.attachCss("margin", staticValue);
        } else if (kind === fastn_dom.PropertyKind.MarginHorizontal) {
            this.attachCss("margin-left", staticValue);
            this.attachCss("margin-right", staticValue);
        } else if (kind === fastn_dom.PropertyKind.MarginVertical) {
            this.attachCss("margin-top", staticValue);
            this.attachCss("margin-bottom", staticValue);
        } else if (kind === fastn_dom.PropertyKind.MarginLeft) {
            this.attachCss("margin-left", staticValue);
        } else if (kind === fastn_dom.PropertyKind.MarginRight) {
            this.attachCss("margin-right", staticValue);
        } else if (kind === fastn_dom.PropertyKind.MarginTop) {
            this.attachCss("margin-top", staticValue);
        } else if (kind === fastn_dom.PropertyKind.MarginBottom) {
            this.attachCss("margin-bottom", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderWidth) {
            this.attachCss("border-width", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderTopWidth) {
            this.attachCss("border-top-width", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderBottomWidth) {
            this.attachCss("border-bottom-width", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderLeftWidth) {
            this.attachCss("border-left-width", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderRightWidth) {
            this.attachCss("border-right-width", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderRadius) {
            this.attachCss("border-radius", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderTopLeftRadius) {
            this.attachCss("border-top-left-radius", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderTopRightRadius) {
            this.attachCss("border-top-right-radius", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderBottomLeftRadius) {
            this.attachCss("border-bottom-left-radius", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderBottomRightRadius) {
            this.attachCss("border-bottom-right-radius", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderStyle) {
            this.attachCss("border-style", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderStyleVertical) {
            this.attachCss("border-top-style", staticValue);
            this.attachCss("border-bottom-style", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderStyleHorizontal) {
            this.attachCss("border-left-style", staticValue);
            this.attachCss("border-right-style", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderLeftStyle) {
            this.attachCss("border-left-style", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderRightStyle) {
            this.attachCss("border-right-style", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderTopStyle) {
            this.attachCss("border-top-style", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderBottomStyle) {
            this.attachCss("border-bottom-style", staticValue);
        } else if (kind === fastn_dom.PropertyKind.ZIndex) {
            this.attachCss("z-index", staticValue);
        } else if (kind === fastn_dom.PropertyKind.Shadow) {
            this.attachShadow(staticValue);
        } else if (kind === fastn_dom.PropertyKind.TextShadow) {
            this.attachTextShadow(staticValue);
        } else if (kind === fastn_dom.PropertyKind.Classes) {
            fastn_utils.removeNonFastnClasses(this);
            if (!fastn_utils.isNull(staticValue)) {
                let cls = staticValue.map(obj => fastn_utils.getStaticValue(obj.item));
                cls.forEach((c) => {
                    this.#node.classList.add(c);
                });
            }
        } else if (kind === fastn_dom.PropertyKind.Anchor) {
            // todo: this needs fixed for anchor.id = v
            // need to change position of element with id = v to relative
            if (fastn_utils.isNull(staticValue)) {
                this.attachCss("position", staticValue);
                return;
            }

            let anchorType = staticValue[0];
            switch (anchorType) {
              case 1:
                this.attachCss("position", staticValue[1]);
                break;
              case 2:
                this.attachCss("position", staticValue[1]);
                this.updateParentPosition("relative");
                break;
              case 3:
                const parent_node_id = staticValue[1];
                this.attachCss("position", "absolute");
                this.updatePositionForNodeById(parent_node_id, "relative");
                break;
            }
        } else if (kind === fastn_dom.PropertyKind.Sticky) {
            // sticky is boolean type
            switch (staticValue) {
              case 'true':
              case true:
                this.attachCss("position", "sticky");
                break;
              case 'false':
              case false:
                this.attachCss("position", "static");
                break;
              default:
                this.attachCss("position", staticValue);
            }
        } else if (kind === fastn_dom.PropertyKind.Top) {
            this.attachCss("top", staticValue);
        } else if (kind === fastn_dom.PropertyKind.Bottom) {
            this.attachCss("bottom", staticValue);
        } else if (kind === fastn_dom.PropertyKind.Left) {
            this.attachCss("left", staticValue);
        } else if (kind === fastn_dom.PropertyKind.Right) {
            this.attachCss("right", staticValue);
        } else if (kind === fastn_dom.PropertyKind.Overflow) {
            this.attachCss("overflow", staticValue);
        } else if (kind === fastn_dom.PropertyKind.OverflowX) {
            this.attachCss("overflow-x", staticValue);
        } else if (kind === fastn_dom.PropertyKind.OverflowY) {
            this.attachCss("overflow-y", staticValue);
        } else if (kind === fastn_dom.PropertyKind.Spacing) {
            if (fastn_utils.isNull(staticValue)) {
                this.attachCss("justify-content", staticValue);
                this.attachCss("gap", staticValue);
                return;
            }

            let spacingType = staticValue[0];
            switch (spacingType) {
                case fastn_dom.Spacing.SpaceEvenly[0]:
                case fastn_dom.Spacing.SpaceBetween[0]:
                case fastn_dom.Spacing.SpaceAround[0]:
                    this.attachCss("justify-content", staticValue[1]);
                    break;
                case fastn_dom.Spacing.Fixed()[0]:
                    this.attachCss("gap", staticValue[1]);
                    break;
            }

        } else if (kind === fastn_dom.PropertyKind.Wrap) {
            // sticky is boolean type
            switch (staticValue) {
              case 'true':
              case true:
                this.attachCss("flex-wrap", "wrap");
                break;
              case 'false':
              case false:
                this.attachCss("flex-wrap", "no-wrap");
                break;
              default:
                this.attachCss("flex-wrap", staticValue);
            }
        } else if (kind === fastn_dom.PropertyKind.TextTransform) {
            this.attachCss("text-transform", staticValue);
        } else if (kind === fastn_dom.PropertyKind.TextIndent) {
            this.attachCss("text-indent", staticValue);
        } else if (kind === fastn_dom.PropertyKind.TextAlign) {
            this.attachCss("text-align", staticValue);
        } else if (kind === fastn_dom.PropertyKind.LineClamp) {
            // -webkit-line-clamp: staticValue
            // display: -webkit-box, overflow: hidden
            // -webkit-box-orient: vertical
            this.attachCss("-webkit-line-clamp", staticValue);
            this.attachCss("display", "-webkit-box");
            this.attachCss("overflow", "hidden");
            this.attachCss("-webkit-box-orient", "vertical");
        } else if (kind === fastn_dom.PropertyKind.Opacity) {
            this.attachCss("opacity", staticValue);
        } else if (kind === fastn_dom.PropertyKind.Cursor) {
            this.attachCss("cursor", staticValue);
        } else if (kind === fastn_dom.PropertyKind.Resize) {
            // overflow: auto, resize: staticValue
            this.attachCss("resize", staticValue);
            this.attachCss("overflow", "auto");
        } else if (kind === fastn_dom.PropertyKind.MinHeight) {
            this.attachCss("min-height", staticValue);
        } else if (kind === fastn_dom.PropertyKind.MaxHeight) {
            this.attachCss("max-height", staticValue);
        } else if (kind === fastn_dom.PropertyKind.MinWidth) {
            this.attachCss("min-width", staticValue);
        } else if (kind === fastn_dom.PropertyKind.MaxWidth) {
            this.attachCss("max-width", staticValue);
        } else if (kind === fastn_dom.PropertyKind.WhiteSpace) {
            this.attachCss("white-space", staticValue);
        } else if (kind === fastn_dom.PropertyKind.AlignSelf) {
            this.attachCss("align-self", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderColor) {
            this.attachColorCss("border-color", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderLeftColor) {
            this.attachColorCss("border-left-color", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderRightColor) {
            this.attachColorCss("border-right-color", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderTopColor) {
            this.attachColorCss("border-top-color", staticValue);
        } else if (kind === fastn_dom.PropertyKind.BorderBottomColor) {
            this.attachColorCss("border-bottom-color", staticValue);
        } else if (kind === fastn_dom.PropertyKind.LinkColor) {
            this.attachLinkColor(staticValue);
        } else if (kind === fastn_dom.PropertyKind.Color) {
            this.attachColorCss("color", staticValue, true);
        } else if (kind === fastn_dom.PropertyKind.Background) {
            if (fastn_utils.isNull(staticValue)) {
                this.attachColorCss("background-color", staticValue);
                this.attachBackgroundImageCss(staticValue);
                this.attachLinearGradientCss(staticValue);
                return;
            }

            let backgroundType = staticValue[0];
            switch (backgroundType) {
                case fastn_dom.BackgroundStyle.Solid()[0]:
                    this.attachColorCss("background-color", staticValue[1]);
                    break;
                case fastn_dom.BackgroundStyle.Image()[0]:
                    this.attachBackgroundImageCss(staticValue[1]);
                    break;
                case fastn_dom.BackgroundStyle.LinearGradient()[0]:
                    this.attachLinearGradientCss(staticValue[1]);
                    break;
            }
        } else if (kind === fastn_dom.PropertyKind.Display) {
            this.attachCss("display", staticValue);
        } else if (kind === fastn_dom.PropertyKind.Checked) {
            switch (staticValue) {
                case "true":
                case true:
                    this.attachAttribute("checked", "");
                    break;
                case "false":
                case false:
                    this.removeAttribute("checked");
                    break;
                default:
                    this.attachAttribute("checked", staticValue);
            }
        } else if (kind === fastn_dom.PropertyKind.Enabled) {
            switch (staticValue) {
                case "false":
                case false:
                    this.attachAttribute("disabled", "");
                    break;
                case "true":
                case true:
                    this.removeAttribute("disabled");
                    break;
                default:
                    this.attachAttribute("disabled", staticValue);
            }
        } else if (kind === fastn_dom.PropertyKind.TextInputType) {
            this.attachAttribute("type", staticValue);
        } else if (kind === fastn_dom.PropertyKind.DefaultTextInputValue) {
            this.attachAttribute("value", staticValue);
        } else if (kind === fastn_dom.PropertyKind.InputMaxLength) {
            this.attachAttribute("maxlength", staticValue);
        } else if (kind === fastn_dom.PropertyKind.Placeholder) {
            this.attachAttribute("placeholder", staticValue);
        } else if (kind === fastn_dom.PropertyKind.Multiline) {
            switch (staticValue) {
                case "true":
                case true:
                    this.updateTagName("textarea");
                    break;
                case "false":
                case false:
                    this.updateTagName("input");
                    break;
            }
        } else if (kind === fastn_dom.PropertyKind.Link) {
            // Changing node type to `a` for link
            // todo: needs fix for image links
            this.updateToAnchor(staticValue);
        } else if (kind === fastn_dom.PropertyKind.LinkRel) {
            if (fastn_utils.isNull(staticValue)) {
                this.removeAttribute("rel");
            }
            let rel_list = staticValue.map(obj => fastn_utils.getStaticValue(obj.item));
            this.attachAttribute("rel", rel_list.join(" "));
        } else if (kind === fastn_dom.PropertyKind.OpenInNewTab) {
            // open_in_new_tab is boolean type
            switch (staticValue) {
              case 'true':
              case true:
                this.attachAttribute("target", "_blank");
                break;
              default:
                this.attachAttribute("target", staticValue);
            }
        } else if (kind === fastn_dom.PropertyKind.TextStyle) {
            let styles = staticValue?.map(obj => fastn_utils.getStaticValue(obj.item));
            this.attachTextStyles(styles);
        } else if (kind === fastn_dom.PropertyKind.Region) {
            this.updateTagName(staticValue);
            if (this.#node.innerHTML) {
                this.#node.id = fastn_utils.slugify(this.#rawInnerValue);
            }
        } else if (kind === fastn_dom.PropertyKind.AlignContent) {
            let node_kind = this.#kind;
            this.attachAlignContent(staticValue, node_kind);
        } else if (kind === fastn_dom.PropertyKind.Loading) {
            this.attachAttribute("loading", staticValue);
        } else if (kind === fastn_dom.PropertyKind.Src) {
            this.attachAttribute("src", staticValue);
        } else if (kind === fastn_dom.PropertyKind.ImageSrc) {
            ftd.dark_mode.addClosure(fastn.closure(() => {
                if (fastn_utils.isNull(staticValue)) {
                    this.attachAttribute("src", staticValue);
                    return;
                }
                const is_dark_mode = ftd.dark_mode.get();
                const src = staticValue.get(is_dark_mode ? 'dark' : 'light');
                if (!ssr) {
                    let image_node = this.#node;
                    if( image_node.nodeName.toLowerCase() === "a" ) {
                        let childNodes = image_node.childNodes;
                        childNodes.forEach(function(child) {
                            if (child.nodeName.toLowerCase() === "img")
                                image_node = child;
                        });
                    }
                    image_node.setAttribute("src", fastn_utils.getStaticValue(src));
                }
                else {
                    this.attachAttribute("src", fastn_utils.getStaticValue(src));
                }
            }).addNodeProperty(this, null, inherited));
            this.#mutables.push(ftd.dark_mode);
        } else if (kind === fastn_dom.PropertyKind.Alt) {
            this.attachAttribute("alt", staticValue);
        } else if (kind === fastn_dom.PropertyKind.VideoSrc) {
            ftd.dark_mode.addClosure(fastn.closure(() => {
                if (fastn_utils.isNull(staticValue)) {
                    this.attachAttribute("src", staticValue);
                    return;
                }
                const is_dark_mode = ftd.dark_mode.get();
                const src = staticValue.get(is_dark_mode ? 'dark' : 'light');

                this.attachAttribute("src", fastn_utils.getStaticValue(src));
            }).addNodeProperty(this, null, inherited));
            this.#mutables.push(ftd.dark_mode);
        } else if (kind === fastn_dom.PropertyKind.Autoplay) {
            if(staticValue) {
                this.attachAttribute("autoplay", staticValue);
            } else {
                this.removeAttribute("autoplay");
            }
        } else if (kind === fastn_dom.PropertyKind.Muted) {
            if(staticValue) {
                this.attachAttribute("muted", staticValue);
            } else {
                this.removeAttribute("muted");
            }
        } else if (kind === fastn_dom.PropertyKind.Controls) {
            if(staticValue) {
                this.attachAttribute("controls", staticValue);
            } else {
                this.removeAttribute("controls");
            }
        } else if (kind === fastn_dom.PropertyKind.LoopVideo) {
            if(staticValue) {
                this.attachAttribute("loop", staticValue);
            } else {
                this.removeAttribute("loop");
            }
        } else if (kind === fastn_dom.PropertyKind.Poster) {
            ftd.dark_mode.addClosure(fastn.closure(() => {
                if (fastn_utils.isNull(staticValue)) {
                    this.attachAttribute("poster", staticValue);
                    return;
                }
                const is_dark_mode = ftd.dark_mode.get();
                const posterSrc = staticValue.get(is_dark_mode ? 'dark' : 'light');

                this.attachAttribute("poster", fastn_utils.getStaticValue(posterSrc));
            }).addNodeProperty(this, null, inherited));
            this.#mutables.push(ftd.dark_mode);
        } else if (kind === fastn_dom.PropertyKind.Fit) {
            this.attachCss("object-fit", staticValue);
        } else if (kind === fastn_dom.PropertyKind.YoutubeSrc) {
            if (fastn_utils.isNull(staticValue)) {
                this.attachAttribute("src", staticValue);
                return;
            }
            const id_pattern = "^([a-zA-Z0-9_-]{11})$";
            let id = staticValue.match(id_pattern);
            if (!fastn_utils.isNull(id)) {
                this.attachAttribute("src", `https:\/\/youtube.com/embed/${id[0]}`);
            } else {
                this.attachAttribute("src", staticValue);
            }

        } else if (kind === fastn_dom.PropertyKind.Role) {
            this.attachRoleCss(staticValue);
        } else if (kind === fastn_dom.PropertyKind.Code) {
            if (!fastn_utils.isNull(staticValue)) {
                let {
                    modifiedText,
                    highlightedLines
                } = fastn_utils.findAndRemoveHighlighter(staticValue);
                if (highlightedLines.length !== 0) {
                    this.attachAttribute("data-line", highlightedLines);
                }
                staticValue = modifiedText;
            }
            let codeNode = this.#children[0].getNode();
            let codeText = fastn_utils.escapeHtmlInCode(staticValue);
            codeNode.innerHTML= codeText;
            this.#extraData.code = this.#extraData.code ? this.#extraData.code : {};
            fastn_utils.highlightCode(codeNode, this.#extraData.code);
        }  else if (kind === fastn_dom.PropertyKind.CodeShowLineNumber) {
            if (staticValue) {
                this.#node.classList.add("line-numbers");
            } else {
                this.#node.classList.remove("line-numbers");
            }
        } else if (kind === fastn_dom.PropertyKind.CodeTheme) {
            this.#extraData.code = this.#extraData.code ? this.#extraData.code : {};
            if(fastn_utils.isNull(staticValue)) {
                if(!fastn_utils.isNull(this.#extraData.code.theme)) {
                    this.#node.classList.remove(this.#extraData.code.theme);
                }
                return;
            }
            if (!ssr) {
                fastn_utils.addCodeTheme(staticValue);
            }
            staticValue = fastn_utils.getStaticValue(staticValue);
            let theme = staticValue.replace("\.", "-");
            if (this.#extraData.code.theme !== theme) {
                let codeNode = this.#children[0].getNode();
                this.#node.classList.remove(this.#extraData.code.theme);
                codeNode.classList.remove(this.#extraData.code.theme);
                this.#extraData.code.theme = theme;
                this.#node.classList.add(theme);
                codeNode.classList.add(theme);
                fastn_utils.highlightCode(codeNode, this.#extraData.code);
            }
        } else if (kind === fastn_dom.PropertyKind.CodeLanguage) {
            let language = `language-${staticValue}`;
            this.#extraData.code = this.#extraData.code ? this.#extraData.code : {};
            if (this.#extraData.code.language) {
                this.#node.classList.remove(language);
            }
            this.#extraData.code.language = language;
            this.#node.classList.add(language);
            let codeNode = this.#children[0].getNode();
            codeNode.classList.add(language);
            fastn_utils.highlightCode(codeNode, this.#extraData.code);
        } else if (kind === fastn_dom.PropertyKind.Favicon) {
            if (fastn_utils.isNull(staticValue)) return;
            this.setFavicon(staticValue);
        } else if (kind === fastn_dom.PropertyKind.DocumentProperties.MetaTitle) {
            this.updateMetaTitle(staticValue);
        } else if (kind === fastn_dom.PropertyKind.DocumentProperties.MetaOGTitle) {
            this.addMetaTagByProperty("og:title", staticValue);
        } else if (kind === fastn_dom.PropertyKind.DocumentProperties.MetaTwitterTitle) {
            this.addMetaTagByName("twitter:title", staticValue);
        } else if (kind === fastn_dom.PropertyKind.DocumentProperties.MetaDescription) {
            this.addMetaTagByName("description", staticValue);
        } else if (kind === fastn_dom.PropertyKind.DocumentProperties.MetaOGDescription) {
            this.addMetaTagByProperty("og:description", staticValue);
        } else if (kind === fastn_dom.PropertyKind.DocumentProperties.MetaTwitterDescription) {
            this.addMetaTagByName("twitter:description", staticValue);
        } else if (kind === fastn_dom.PropertyKind.DocumentProperties.MetaOGImage) {
            // staticValue is of ftd.raw-image-src RecordInstance type
            if (fastn_utils.isNull(staticValue)) {
                this.removeMetaTagByProperty("og:image");
                return;
            }
            this.addMetaTagByProperty("og:image", fastn_utils.getStaticValue(staticValue.get('src')));
        } else if (kind === fastn_dom.PropertyKind.DocumentProperties.MetaTwitterImage) {
            // staticValue is of ftd.raw-image-src RecordInstance type
            if (fastn_utils.isNull(staticValue)) {
                this.removeMetaTagByName("twitter:image");
                return;
            }
            this.addMetaTagByName("twitter:image", fastn_utils.getStaticValue(staticValue.get('src')));
        } else if (kind === fastn_dom.PropertyKind.DocumentProperties.MetaThemeColor) {
            // staticValue is of ftd.color RecordInstance type
            if (fastn_utils.isNull(staticValue)) {
                this.removeMetaTagByName("theme-color");
                return;
            }
            this.addMetaTagByName("theme-color", fastn_utils.getStaticValue(staticValue.get('light')));
        } else if (kind === fastn_dom.PropertyKind.IntegerValue
            || kind === fastn_dom.PropertyKind.DecimalValue
            || kind === fastn_dom.PropertyKind.BooleanValue) {
            this.#node.innerHTML = staticValue;
            this.#rawInnerValue = staticValue;
        } else if (kind === fastn_dom.PropertyKind.StringValue) {
            this.#rawInnerValue = staticValue;
            if (!hydrating || this.#node.innerHTML === "undefined") {
                staticValue = fastn_utils.markdown_inline(fastn_utils.escapeHtmlInMarkdown(staticValue));
            } else {
                staticValue = this.#node.innerHTML;
            }
            staticValue = fastn_utils.process_post_markdown(this.#node, staticValue);
            this.#node.innerHTML = staticValue;
        } else {
            throw ("invalid fastn_dom.PropertyKind: " + kind);
        }
    }
    setProperty(kind, value, inherited) {
        if (value instanceof fastn.mutableClass) {
            this.setDynamicProperty(kind, [value], () => { return value.get(); }, inherited);
        } else if (value instanceof PropertyValueAsClosure) {
            this.setDynamicProperty(kind, value.deps, value.closureFunction, inherited);
        } else {
            this.setStaticProperty(kind, value, inherited);
        }
    }
    setDynamicProperty(kind, deps, func, inherited) {
        let closure = fastn.closure(func).addNodeProperty(this, kind, inherited);
        for (let dep in deps) {
            if (fastn_utils.isNull(deps[dep]) || !deps[dep].addClosure) {
                continue;
            }
            deps[dep].addClosure(closure);
            this.#mutables.push(deps[dep]);
        }
    }
    getNode() {
        return this.#node;
    }
    getExtraData() {
        return this.#extraData
    }
    getChildren() {
        return this.#children;
    }
    mergeFnCalls(current, newFunc) {
        return () => {
            if (current instanceof Function) current();
            if (newFunc instanceof Function) newFunc();
        };
    }
    addEventHandler(event, func) {
        if (event === fastn_dom.Event.Click) {
            let onclickEvents = this.mergeFnCalls(this.#node.onclick, func);
            if (fastn_utils.isNull(this.#node.onclick)) this.attachCss("cursor", "pointer");
            this.#node.onclick = onclickEvents;
        } else if (event === fastn_dom.Event.MouseEnter) {
            let mouseEnterEvents = this.mergeFnCalls(this.#node.onmouseenter, func);
            this.#node.onmouseenter = mouseEnterEvents;
        } else if (event === fastn_dom.Event.MouseLeave) {
            let mouseLeaveEvents = this.mergeFnCalls(this.#node.onmouseleave, func);
            this.#node.onmouseleave = mouseLeaveEvents;
        } else if (event === fastn_dom.Event.ClickOutside) {
            ftd.clickOutsideEvents.push([this, func]);
        } else if (!!event[0] && event[0] === fastn_dom.Event.GlobalKey()[0]) {
            ftd.globalKeyEvents.push([this, func, event[1]]);
        } else if (!!event[0] && event[0] === fastn_dom.Event.GlobalKeySeq()[0]) {
            ftd.globalKeySeqEvents.push([this, func, event[1]]);
        } else if (event === fastn_dom.Event.Input) {
            let onInputEvents = this.mergeFnCalls(this.#node.oninput, func);
            this.#node.oninput = onInputEvents;
        } else if (event === fastn_dom.Event.Change) {
            let onChangeEvents = this.mergeFnCalls(this.#node.onchange, func);
            this.#node.onchange = onChangeEvents;
        } else if (event === fastn_dom.Event.Blur) {
            let onBlurEvents = this.mergeFnCalls(this.#node.onblur, func);
            this.#node.onblur = onBlurEvents;
        } else if (event === fastn_dom.Event.Focus) {
            let onFocusEvents = this.mergeFnCalls(this.#node.onfocus, func);
            this.#node.onfocus = onFocusEvents;
        }
    }
    destroy() {
        for (let i = 0; i < this.#mutables.length; i++) {
            this.#mutables[i].unlinkNode(this);
        }
        // Todo: We don't need this condition as after destroying this node
        //  ConditionalDom reset this.#conditionUI to null or some different
        //  value. Not sure why this is still needed.
        if (!fastn_utils.isNull(this.#node)) {
            this.#node.remove();
        }
        this.#mutables = [];
        this.#parent = null;
        this.#node = null;
    }
}

class ConditionalDom {
    #marker;
    #parent;
    #node_constructor;
    #condition;
    #mutables;
    #conditionUI;

    constructor(parent, deps, condition, node_constructor) {
        this.#marker = fastn_dom.createKernel(parent, fastn_dom.ElementKind.Comment);
        this.#parent = parent;

        this.#conditionUI = null;
        let closure = fastn.closure(() => {
            fastn_utils.resetFullHeight();
            if (condition()) {
                if (this.#conditionUI) {
                    let conditionUI = fastn_utils.flattenArray(this.#conditionUI);
                    while (conditionUI.length > 0) {
                        let poppedElement = conditionUI.pop();
                        poppedElement.destroy();
                    }
                }
                this.#conditionUI = node_constructor(new ParentNodeWithSibiling(this.#parent, this.#marker));
                if (!Array.isArray(this.#conditionUI) && fastn_utils.isWrapperNode(this.#conditionUI.getTagName())) {
                    this.#conditionUI = this.#conditionUI.getChildren();
                }
            } else if (this.#conditionUI) {
                let conditionUI = fastn_utils.flattenArray(this.#conditionUI);
                while (conditionUI.length > 0) {
                    let poppedElement = conditionUI.pop();
                    poppedElement.destroy();
                }
                this.#conditionUI = null;
            }
            fastn_utils.setFullHeight();
        })
        deps.forEach(dep => {
            if (!fastn_utils.isNull(dep) && dep.addClosure) {
                dep.addClosure(closure);
            }
        });

        this.#node_constructor = node_constructor;
        this.#condition = condition;
        this.#mutables = [];
    }

    getParent() {
        let nodes =  [this.#marker];
        if (this.#conditionUI) {
            nodes.push(this.#conditionUI);
        }
        return nodes;
    }
}

fastn_dom.createKernel = function (parent, kind) {
    return new Node2(parent, kind);
}

fastn_dom.conditionalDom = function (parent, deps, condition, node_constructor) {
    return new ConditionalDom(parent, deps, condition, node_constructor);
}

class ParentNodeWithSibiling {
    #parent;
    #sibiling;
    constructor(parent, sibiling) {
        this.#parent = parent;
        this.#sibiling = sibiling;
    }
    getParent() {
        return this.#parent;
    }
    getSibiling() {
        return this.#sibiling;
    }
}

class ForLoop {
    #node_constructor;
    #list;
    #wrapper;
    #parent;
    #nodes;
    constructor(parent, node_constructor, list) {
        this.#wrapper = fastn_dom.createKernel(parent, fastn_dom.ElementKind.Comment);
        this.#parent = parent;
        this.#node_constructor = node_constructor;
        this.#list = list;
        this.#nodes = [];

        fastn_utils.resetFullHeight();
        for (let idx in list.getList()) {
            this.createNode(idx, false);
        }
        fastn_utils.setFullHeight();
    }
    createNode(index, resizeBodyHeight= true) {
        if (resizeBodyHeight) {
            fastn_utils.resetFullHeight();
        }
        let parentWithSibiling = new ParentNodeWithSibiling(this.#parent, this.#wrapper);
        if (index !== 0) {
            parentWithSibiling = new ParentNodeWithSibiling(this.#parent, this.#nodes[index-1]);
        }
        let v = this.#list.get(index);
        let node = this.#node_constructor(parentWithSibiling, v.item, v.index);
        this.#nodes.splice(index, 0, node);
        if (resizeBodyHeight) {
            fastn_utils.setFullHeight();
        }
        return node;
    }
    createAllNode() {
        fastn_utils.resetFullHeight();
        this.deleteAllNode(false);
        for (let idx in this.#list.getList()) {
            this.createNode(idx, false);
        }
        fastn_utils.setFullHeight();
    }
    deleteAllNode(resizeBodyHeight= true) {
        if (resizeBodyHeight) {
            fastn_utils.resetFullHeight();
        }
        while (this.#nodes.length > 0) {
            this.#nodes.pop().destroy();
        }
        if (resizeBodyHeight) {
            fastn_utils.setFullHeight();
        }
    }
    getWrapper() {
        return this.#wrapper;
    }
    deleteNode(index) {
        fastn_utils.resetFullHeight();
        let node = this.#nodes.splice(index, 1)[0];
        node.destroy();
        fastn_utils.setFullHeight();
    }
    getParent() {
        return this.#parent;
    }
}

fastn_dom.forLoop = function (parent, node_constructor, list) {
    return new ForLoop(parent, node_constructor, list);
}
let fastn_utils = {
    htmlNode(kind) {
        let node = "div";
        let css = [];
        let attributes = {};
        if (kind === fastn_dom.ElementKind.Column) {
            css.push("ft_column");
        } else if (kind === fastn_dom.ElementKind.Document) {
            css.push("ft_column");
            css.push("full");
        } else if (kind === fastn_dom.ElementKind.Row) {
            css.push("ft_row");
        } else if (kind === fastn_dom.ElementKind.IFrame) {
            node = "iframe";
            // To allow fullscreen support
            // Reference: https://stackoverflow.com/questions/27723423/youtube-iframe-embed-full-screen
            attributes["allowfullscreen"] = "";
        } else if (kind === fastn_dom.ElementKind.Image) {
            node = "img";
        } else if (kind === fastn_dom.ElementKind.Video) {
            node = "video";
        } else if (kind === fastn_dom.ElementKind.ContainerElement ||
            kind === fastn_dom.ElementKind.Text) {
            node = "div";
        } else if (kind === fastn_dom.ElementKind.Rive) {
            node = "canvas";
        } else if (kind === fastn_dom.ElementKind.CheckBox) {
            node = "input";
            attributes["type"] = "checkbox";
        } else if (kind === fastn_dom.ElementKind.TextInput) {
            node = "input";
        } else if (kind === fastn_dom.ElementKind.Comment) {
            node = fastn_dom.commentNode;
        } else if (kind === fastn_dom.ElementKind.Wrapper) {
            node = fastn_dom.wrapperNode;
        } else if (kind === fastn_dom.ElementKind.Code) {
           node = "pre";
        } else if (kind === fastn_dom.ElementKind.CodeChild) {
            node = "code";
        } else if (kind[0] === fastn_dom.ElementKind.WebComponent()[0]) {
            let [webcomponent, args] = kind[1];
            node = `${webcomponent}`;
            fastn_dom.webComponent.push(args);
            attributes[fastn_dom.webComponentArgument] = fastn_dom.webComponent.length - 1;
        }
        return [node, css, attributes];
    },
    getStaticValue(obj) {
        if (obj instanceof fastn.mutableClass) {
           return this.getStaticValue(obj.get());
        } else if (obj instanceof fastn.mutableListClass) {
            return obj.getList();
        }/*
        Todo: Make this work
        else if (obj instanceof fastn.recordInstanceClass) {
            return obj.getAllFields();
        }*/ else {
           return obj;
        }
    },
    getInheritedValues(default_args, inherited, function_args) {
        let record_fields = {
            "colors": ftd.default_colors.getClone().setAndReturn("is-root", true),
            "types": ftd.default_types.getClone().setAndReturn("is-root", true)
        }
        Object.assign(record_fields, default_args);
        let fields = {};
        if (inherited instanceof fastn.recordInstanceClass) {
            fields = inherited.getAllFields();
            if (fields["colors"].get("is-root")) {
               delete fields.colors;
            }
            if (fields["types"].get("is-root")) {
               delete fields.types;
            }
        }
        Object.assign(record_fields, fields);
        Object.assign(record_fields, function_args);
        return fastn.recordInstance({
              ...record_fields
        });
    },
    removeNonFastnClasses(node) {
        let classList = node.getNode().classList;
        let extraCodeData = node.getExtraData().code;
        let iterativeClassList = classList;
        if (ssr) {
            iterativeClassList = iterativeClassList.getClasses();
        }
        const classesToRemove = [];

        for (const className of iterativeClassList) {
            if (!className.startsWith('__') &&
                className !== extraCodeData?.language &&
                className !== extraCodeData?.theme
            ) {
                classesToRemove.push(className);
            }
        }

        for (const classNameToRemove of classesToRemove) {
            classList.remove(classNameToRemove);
        }
    },
    staticToMutables(obj) {
        if (!(obj instanceof fastn.mutableClass) &&
            !(obj instanceof fastn.mutableListClass) &&
            !(obj instanceof fastn.recordInstanceClass))
        {
            if (Array.isArray(obj)) {
                let list = [];
                for (let index in obj) {
                    list.push(fastn_utils.staticToMutables(obj[index]));
                }
                return fastn.mutableList(list);
            } else if (obj instanceof Object) {
                let fields = {};
                for (let objKey in obj) {
                    fields[objKey] = fastn_utils.staticToMutables(obj[objKey]);
                }
                return fastn.recordInstance(fields);
            } else {
                return fastn.mutable(obj);
            }
        } else {
            return obj;
        }
    },
    getFlattenStaticValue(obj) {
        let staticValue = fastn_utils.getStaticValue(obj);
        if (Array.isArray(staticValue)) {
            return staticValue.map(func =>
                fastn_utils.getFlattenStaticValue(func.item));
        } /*
        Todo: Make this work
        else if (typeof staticValue === 'object' && fastn_utils.isNull(staticValue)) {
            return Object.fromEntries(
                Object.entries(staticValue).map(([k,v]) =>
                    [k, fastn_utils.getFlattenStaticValue(v)]
                )
            );
        }*/
        return staticValue;
    },
    getter(value) {
        if (value instanceof fastn.mutableClass) {
            return value.get();
        } else {
            return value;
        }
    },
    // Todo: Merge getterByKey with getter
    getterByKey(value, index) {
        if (value instanceof fastn.mutableClass
            || value instanceof fastn.recordInstanceClass) {
            return value.get(index);
        } else if (value instanceof fastn.mutableListClass) {
            return value.get(index).item;
        } else {
            return value;
        }
    },
    setter(variable, value) {
        if (!fastn_utils.isNull(variable) && variable.set) {
           variable.set(value);
           return true;
        }
        return false;
    },
    defaultPropertyValue(_propertyValue) {
        return null;
    },
    sameResponsiveRole(desktop, mobile) {
       return (desktop.get("font_family") ===  mobile.get("font_family")) &&
       (desktop.get("letter_spacing") ===  mobile.get("letter_spacing")) &&
       (desktop.get("line_height") ===  mobile.get("line_height")) &&
       (desktop.get("size") ===  mobile.get("size")) &&
       (desktop.get("weight") ===  mobile.get("weight"));
    },
    getRoleValues(value) {
        let font_families = fastn_utils.getStaticValue(value.get("font_family"));
        if (Array.isArray(font_families))
            font_families = font_families.map(obj => fastn_utils.getStaticValue(obj.item)).join(', ');
        return {
            "font-family": font_families,
            "letter-spacing": fastn_utils.getStaticValue(value.get("letter_spacing")),
            "font-size": fastn_utils.getStaticValue(value.get("size")),
            "font-weight": fastn_utils.getStaticValue(value.get("weight")),
            "line-height": fastn_utils.getStaticValue(value.get("line_height")),
        };
    },
    clone(value) {
        if (value === null || value === undefined) {
            return value;
        }
        if (value instanceof fastn.mutableClass ||
            value instanceof fastn.mutableListClass )
        {
            return value.getClone();
        }
           if (value instanceof fastn.recordInstanceClass) {
            return value.getClone();
        }
        return value;
    },
    getListItem(value) {
        if (value === undefined){
            return null;
        }
        if (value instanceof Object && value.hasOwnProperty("item")) {
            value = value.item;
        }
        return value;
    },
    getEventKey(event) {
        if (65 <= event.keyCode && event.keyCode <= 90) {
            return String.fromCharCode(event.keyCode).toLowerCase();
        }
        else {
            return event.key;
        }
    },
    createNestedObject(currentObject, path, value) {
        const properties = path.split('.');

        for (let i = 0; i < properties.length - 1; i++) {
            let property = fastn_utils.private.addUnderscoreToStart(properties[i]);
            if (currentObject instanceof fastn.recordInstanceClass) {
                if (currentObject.get(property) === undefined) {
                    currentObject.set(property, fastn.recordInstance({}));
                }
                currentObject = currentObject.get(property).get();
            } else {
                if (!currentObject.hasOwnProperty(property)) {
                    currentObject[property] = fastn.recordInstance({});
                }
                currentObject = currentObject[property];
            }
        }

        const innermostProperty = properties[properties.length - 1];
        if (currentObject instanceof fastn.recordInstanceClass) {
            currentObject.set(innermostProperty, value)
        } else {
            currentObject[innermostProperty] = value;
        }
    },
    /**
     * Takes an input string and processes it as inline markdown using the
     * 'marked' library. The function removes the last occurrence of
     * wrapping <p> tags (i.e. <p> tag found at the end) from the result and
     * adjusts spaces around the content.
     *
     * @param {string} i - The input string to be processed as inline markdown.
     * @returns {string} - The processed string with inline markdown.
     */
    markdown_inline(i) {
        if (fastn_utils.isNull(i)) return;
        const { space_before, space_after } = fastn_utils.private.spaces(i);
        const o = (() => {
            let g = fastn_utils.private.replace_last_occurrence(marked.parse(i), "<p>", "");
            g = fastn_utils.private.replace_last_occurrence(g, "</p>", "");
            return g;
        })();
        return `${fastn_utils.private.repeated_space(space_before)}${o}${fastn_utils.private.repeated_space(space_after)}`.replace(/\n+$/, '');
    },

    process_post_markdown(node, body) {
        if (!ssr) {
            const divElement = document.createElement("div");
            divElement.innerHTML = body;

            const current_node = node;
            const colorClasses = Array.from(current_node.classList).filter(className => className.startsWith('__c'));
            const roleClasses = Array.from(current_node.classList).filter(className => className.startsWith('__rl'));
            const tableElements = Array.from(divElement.getElementsByTagName('table'));
            const codeElements = Array.from(divElement.getElementsByTagName('code'));

            tableElements.forEach(table => {
                colorClasses.forEach(colorClass => {
                    table.classList.add(colorClass);
                });
            });

            codeElements.forEach(code => {
                roleClasses.forEach(roleClass => {
                    code.classList.add(roleClass);
                });
            });

            body = divElement.innerHTML;
        }
        return body;
    },
    isNull(a) {
        return a === null || a === undefined;
    },
    isCommentNode(node) {
      return node === fastn_dom.commentNode;
    },
    isWrapperNode(node) {
        return node === fastn_dom.wrapperNode;
    },
    nextSibling(node, parent) {
        // For Conditional DOM
        while (Array.isArray(node)) {
            node = node[node.length-1];
        }
        if (node.nextSibling) {
          return node.nextSibling;
        }
        if (node.getNode && node.getNode().nextSibling !== undefined) {
            return node.getNode().nextSibling;
        }
        return parent.getChildren().indexOf(node.getNode()) + 1;
    },
    createNodeHelper(node, classes, attributes) {
        let tagName = node;
        let element = fastn_virtual.document.createElement(node);
        for (let key in attributes) {
            element.setAttribute(key, attributes[key])
        }
        for (let c in classes) {
            element.classList.add(classes[c]);
        }

        return [tagName, element];
    },
    addCssFile(url) {
        // Create a new link element
        const linkElement = document.createElement("link");

        // Set the attributes of the link element
        linkElement.rel = "stylesheet";
        linkElement.href = url;

        // Append the link element to the head section of the document
        document.head.appendChild(linkElement);
    },
    addCodeTheme(theme) {
        if (!fastn_dom.codeData.addedCssFile.includes(theme)) {
            let themeCssUrl = fastn_dom.codeData.availableThemes[theme];
            fastn_utils.addCssFile(themeCssUrl);
            fastn_dom.codeData.addedCssFile.push(theme);
        }
    },
    /**
     * Searches for highlighter occurrences in the text, removes them,
     * and returns the modified text along with highlighted line numbers.
     *
     * @param {string} text - The input text to process.
     * @returns {{ modifiedText: string, highlightedLines: number[] }}
     *   Object containing modified text and an array of highlighted line numbers.
     *
     * @example
     * const text = `/-- ftd.text: Hello ;; hello
     *
     * -- some-component: caption-value
     * attr-name: attr-value ;; <hl>
     *
     *
     * -- other-component: caption-value ;; <hl>
     * attr-name: attr-value`;
     *
     * const result = findAndRemoveHighlighter(text);
     * console.log(result.modifiedText);
     * console.log(result.highlightedLines);
     */
    findAndRemoveHighlighter(text) {
        const lines = text.split('\n');
        const highlighter = ';; <hl>';
        const result = {
            modifiedText: '',
            highlightedLines: ''
        };

        let highlightedLines = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const highlighterIndex = line.indexOf(highlighter);

            if (highlighterIndex !== -1) {
                highlightedLines.push(i + 1); // Adding 1 to convert to human-readable line numbers
                result.modifiedText += line.substring(0, highlighterIndex) + line.substring(highlighterIndex + highlighter.length) + '\n';
            } else {
                result.modifiedText += line + '\n';
            }
        }

        result.highlightedLines = fastn_utils.private.mergeNumbers(highlightedLines);

        return result;
    },
    getNodeValue(node) {
        return node.getNode().value;
    },
    setFullHeight() {
        if(!ssr) {
            document.body.style.height = `max(${document.documentElement.scrollHeight}px, 100%)`;
        }
    },
    resetFullHeight() {
        if(!ssr) {
            document.body.style.height = `100%`;
        }
    },
    highlightCode(codeElement, extraCodeData) {
        if (!ssr && !fastn_utils.isNull(extraCodeData.language) && !fastn_utils.isNull(extraCodeData.theme)) {
            Prism.highlightElement(codeElement);
        }
    },

    //Taken from: https://byby.dev/js-slugify-string
    slugify(str) {
        return String(str)
            .normalize('NFKD') // split accented characters into their base characters and diacritical marks
            .replace('.', '-')
            .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
            .trim() // trim leading or trailing whitespace
            .toLowerCase() // convert to lowercase
            .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
            .replace(/\s+/g, '-') // replace spaces with hyphens
            .replace(/-+/g, '-'); // remove consecutive hyphens
    },

    getEventListeners(node) {
        return {
            onclick: node.onclick,
            onmouseleave: node.onmouseleave,
            onmouseenter: node.onmouseenter,
            oninput: node.oninput,
            onblur: node.onblur,
            onfocus: node.onfocus
        }
    },

    flattenArray(arr) {
        return fastn_utils.private.flattenArray([arr]);
    },
    toSnakeCase(value) {
        return value.trim().split('').map((v, i) => {
            const lowercased = v.toLowerCase();
            if(v == " ") {
              return "_";
            }
            if(v != lowercased && i > 0) {
                return `_${lowercased}`
            }
            return lowercased;
        }).join('');
    },

    escapeHtmlInCode(str) {
        return str.replace(/[<]/g, "&lt;");
    },

    escapeHtmlInMarkdown(str) {
        if(typeof str !== 'string') {
            return str;
        }

        let result = "";
        let ch_map = {
            '<': "&lt;",
            '>': "&gt;",
            '&': "&amp;",
            '"': "&quot;",
            "'": "&#39;",
            '/': "&#47;",
        };
        let foundBackTick = false;
        for (var i = 0; i < str.length; i++) {
            let current = str[i];
            if (current === "`") {
                foundBackTick = !foundBackTick;
            }
            // Ignore escaping html inside backtick (as marked function
            // escape html for backtick content):
            // For instance: In `hello <title>`, `<` and `>` should not be
            // escaped. (`foundBackTick`)
            // Also the `/` which is followed by `<` should be escaped.
            // For instance: `</` should be escaped but `http://` should not
            // be escaped. (`(current === '/' && !(i > 0 && str[i-1] === "<"))`)
            if (foundBackTick || (current === '/' && !(i > 0 && str[i-1] === "<"))) {
                result += current;
                continue;
            }
            result += ch_map[current] ?? current;
        }
        return result;
    },

    // Used to initialize __args__ inside component and UDF js functions
    getArgs(default_args, passed_args) {
        // Note: arguments as variable name not allowed in strict mode
        let args = default_args;
        for (var arg in passed_args) {
            if (!default_args.hasOwnProperty(arg)) {
                args[arg] = passed_args[arg];
                continue;
            }
            if (default_args.hasOwnProperty(arg) && fastn_utils.getStaticValue(passed_args[arg]) !== undefined) {
                args[arg] = passed_args[arg];
            }
        }
        return args;
    },
}


fastn_utils.private = {
    flattenArray(arr) {
        return arr.reduce((acc, item) => {
            return acc.concat(Array.isArray(item) ? fastn_utils.private.flattenArray(item) : item);
        }, []);
    },
    /**
     * Helper function for `fastn_utils.markdown_inline` to find the number of
     * spaces before and after the content.
     *
     * @param {string} s - The input string.
     * @returns {Object} - An object with 'space_before' and 'space_after' properties
     * representing the number of spaces before and after the content.
     */
    spaces(s) {
        let space_before = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] !== ' ') {
                space_before = i;
                break;
            }
            space_before = i + 1;
        }
        if (space_before === s.length) {
            return { space_before, space_after: 0 };
        }

        let space_after = 0;
        for (let i = s.length - 1; i >= 0; i--) {
            if (s[i] !== ' ') {
                space_after = s.length - 1 - i;
                break;
            }
            space_after = i + 1;
        }

        return { space_before, space_after };
    },
    /**
     * Helper function for `fastn_utils.markdown_inline` to replace the last
     * occurrence of a substring in a string.
     *
     * @param {string} s - The input string.
     * @param {string} old_word - The substring to be replaced.
     * @param {string} new_word - The replacement substring.
     * @returns {string} - The string with the last occurrence of 'old_word' replaced by 'new_word'.
     */
    replace_last_occurrence(s, old_word, new_word) {
        if (!s.includes(old_word)) {
            return s;
        }

        const idx = s.lastIndexOf(old_word);
        return s.slice(0, idx) + new_word + s.slice(idx + old_word.length);
    },
    /**
     * Helper function for `fastn_utils.markdown_inline` to generate a string
     * containing a specified number of spaces.
     *
     * @param {number} n - The number of spaces to be generated.
     * @returns {string} - A string with 'n' spaces concatenated together.
     */
    repeated_space(n) {
        return Array.from({ length: n }, () => ' ').join('');
    },
    /**
     * Merges consecutive numbers in a comma-separated list into ranges.
     *
     * @param {string} input - Comma-separated list of numbers.
     * @returns {string} Merged number ranges.
     *
     * @example
     * const input = '1,2,3,5,6,7,8,9,11';
     * const output = mergeNumbers(input);
     * console.log(output); // Output: '1-3,5-9,11'
     */
    mergeNumbers(numbers) {
        if (numbers.length === 0) {
            return "";
        }
        const mergedRanges = [];

        let start = numbers[0];
        let end = numbers[0];

        for (let i = 1; i < numbers.length; i++) {
            if (numbers[i] === end + 1) {
                end = numbers[i];
            } else {
                if (start === end) {
                    mergedRanges.push(start.toString());
                } else {
                    mergedRanges.push(`${start}-${end}`);
                }
                start = end = numbers[i];
            }
        }

        if (start === end) {
            mergedRanges.push(start.toString());
        } else {
            mergedRanges.push(`${start}-${end}`);
        }

        return mergedRanges.join(',');
    },
    addUnderscoreToStart(text) {
        if (/^\d/.test(text)) {
            return '_' + text;
        }
        return text;
    },
}


/*Object.prototype.get = function(index) {
    return this[index];
}*/
let fastn_virtual = {}

let id_counter = 0;
let hydrating = false;
let ssr = false;

class ClassList {
    #classes = [];
    add(item) {
        this.#classes.push(item);
    }

    remove(itemToRemove) {
        this.#classes.filter(item => item !== itemToRemove)
    }
    toString() {
        return this.#classes.join(' ');
    }
    getClasses() {
        return this.#classes;
    }
}

class Node {
    #id
    #tagName
    #children
    #attributes
    constructor(id, tagName) {
        this.#tagName = tagName;
        this.#id = id;
        this.classList = new ClassList();
        this.#children = [];
        this.#attributes = {};
        this.innerHTML = "";
        this.style = {};
        this.onclick = null;
    }
    appendChild(c) {
        this.#children.push(c);
    }

    insertBefore(node, index) {
        this.#children.splice(index, 0, node);
    }

    getChildren() {
        return this.#children;
    }

    setAttribute(attribute, value) {
        this.#attributes[attribute] = value;
    }

    getAttribute(attribute) {
        return this.#attributes[attribute];
    }

    removeAttribute(attribute) {
        if (attribute in this.#attributes) delete this.#attributes[attribute];
    }

    // Caution: This is only supported in ssr mode
    updateTagName(tagName) {
        this.#tagName = tagName;
    }
    // Caution: This is only supported in ssr mode
    toHtmlAsString() {
        const openingTag = `<${this.#tagName}${this.getDataIdString()}${this.getAttributesString()}${this.getClassString()}${this.getStyleString()}>`;
        const closingTag = `</${this.#tagName}>`;
        const innerHTML = this.innerHTML;
        const childNodes = this.#children.map(child => child.toHtmlAsString()).join('');

        return `${openingTag}${innerHTML}${childNodes}${closingTag}`;
    }
    // Caution: This is only supported in ssr mode
    getDataIdString() {
        return ` data-id="${this.#id}"`;
    }
    // Caution: This is only supported in ssr mode
    getClassString() {
        const classList = this.classList.toString();
        return classList ? ` class="${classList}"` : '';
    }
    // Caution: This is only supported in ssr mode
    getStyleString() {
        const styleProperties = Object.entries(this.style)
            .map(([prop, value]) => `${prop}:${value}`)
            .join(';');
        return styleProperties ? ` style="${styleProperties}"` : '';
    }
    // Caution: This is only supported in ssr mode
    getAttributesString() {
        const nodeAttributes = Object.entries(this.#attributes)
            .map(([attribute, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    return `${attribute}=\"${value}\"`;
                }
                return `${attribute}`;
            }).join(' ');
        return nodeAttributes ? ` ${nodeAttributes}` : '';
    }
}

class Document2 {
    createElement(tagName) {
        id_counter++;

        if (ssr) {
            return new Node(id_counter, tagName);
        }

        if (tagName === "body") {
            return window.document.body;
        }

        if (fastn_utils.isWrapperNode(tagName)) {
            return window.document.createComment(fastn_dom.commentMessage);
        }
        if (hydrating) {
            let node = this.getElementByDataID(id_counter);
            if (fastn_utils.isCommentNode(tagName)) {
                let comment= window.document.createComment(fastn_dom.commentMessage);
                node.parentNode.replaceChild(comment, node);
                return comment;
            }
            return node;
        } else {
            if (fastn_utils.isCommentNode(tagName)) {
                return window.document.createComment(fastn_dom.commentMessage);
            }
            return window.document.createElement(tagName);
        }
    }

    getElementByDataID(id) {
        return window.document.querySelector(`[data-id=\"${id}\"]`);
    }
}

fastn_virtual.document = new Document2();



fastn_virtual.hydrate = function(main) {
    hydrating = true;
    let body = fastn_virtual.document.createElement("body");
    main(body);
    id_counter = 0;
    hydrating = false;
}

fastn_virtual.ssr = function(main) {
    ssr = true;
    let body = fastn_virtual.document.createElement("body");
    main(body)
    ssr = false;
    id_counter = 0;
    return body.toHtmlAsString() + fastn_dom.getClassesAsString();
}
let ftd = {
    // source: https://stackoverflow.com/questions/400212/ (cc-by-sa)
    riveNodes: {},
    is_empty(value) {
        value = fastn_utils.getFlattenStaticValue(value);
        return fastn_utils.isNull(value) || value.length === 0;
    },

    len(data) {
        if (!!data && data instanceof fastn.mutableListClass) {
            if (data.getLength)
                return data.getLength();
            return -1;
        }
        if (!!data && data instanceof fastn.mutableClass) {
            let inner_data = data.get();
            return ftd.len(inner_data);
        }
        if (!!data && data.length) {
            return data.length;
        }
        return -2;
    },

    copy_to_clipboard(args) {
        let text = args.a;
        if (text instanceof fastn.mutableClass) text = fastn_utils.getStaticValue(text);
        if (text.startsWith("\\", 0)) {
            text = text.substring(1);
        }
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    },

    // Todo: Implement this (Remove highlighter)
    clean_code(args) {
        return args.a;
    },

    set_rive_boolean(args, node) {
        if (!!args.rive) {
            let riveNode = ftd.riveNodes[`${args.rive}__${ftd.device.get()}`];
            node = riveNode ? riveNode: node;
        }
        let riveConst = node.getExtraData().rive;
        const stateMachineName = riveConst.stateMachineNames[0];
        const inputs = riveConst.stateMachineInputs(stateMachineName);
        const bumpTrigger = inputs.find(i => i.name === args.input);
        bumpTrigger.value = args.value;
    },

    toggle_rive_boolean(args, node) {
        if (!!args.rive) {
            let riveNode = ftd.riveNodes[`${args.rive}__${ftd.device.get()}`];
            node = riveNode ? riveNode: node;
        }
        let riveConst = node.getExtraData().rive;
        const stateMachineName = riveConst.stateMachineNames[0];
        const inputs = riveConst.stateMachineInputs(stateMachineName);
        const trigger = inputs.find(i => i.name === args.input);
        trigger.value = !trigger.value;
    },

    set_rive_integer(args, node) {
        if (!!args.rive) {
            let riveNode = ftd.riveNodes[`${args.rive}__${ftd.device.get()}`];
            node = riveNode ? riveNode: node;
        }
        let riveConst = node.getExtraData().rive;
        const stateMachineName = riveConst.stateMachineNames[0];
        const inputs = riveConst.stateMachineInputs(stateMachineName);
        const trigger = inputs.find(i => i.name === args.input);
        trigger.value = args.value;
    },

    fire_rive(args, node) {
        if (!!args.rive) {
            let riveNode = ftd.riveNodes[`${args.rive}__${ftd.device.get()}`];
            node = riveNode ? riveNode: node;
        }
        let riveConst = node.getExtraData().rive;
        const stateMachineName = riveConst.stateMachineNames[0];
        const inputs = riveConst.stateMachineInputs(stateMachineName);
        const trigger = inputs.find(i => i.name === args.input);
        trigger.fire();
    },

    play_rive(args, node) {
        if (!!args.rive) {
            let riveNode = ftd.riveNodes[`${args.rive}__${ftd.device.get()}`];
            node = riveNode ? riveNode: node;
        }
        node.getExtraData().rive.play(args.input);
    },

    pause_rive(args, node) {
        if (!!args.rive) {
            let riveNode = ftd.riveNodes[`${args.rive}__${ftd.device.get()}`];
            node = riveNode ? riveNode: node;
        }
        node.getExtraData().rive.pause(args.input);
    },

    toggle_play_rive(args, node) {
        if (!!args.rive) {
            let riveNode = ftd.riveNodes[`${args.rive}__${ftd.device.get()}`];
            node = riveNode ? riveNode: node;
        }
        let riveConst = node.getExtraData().rive
        riveConst.playingAnimationNames.includes(args.input)
            ? riveConst.pause(args.input)
            : riveConst.play(args.input);
    },

    get(value, index) {
         return fastn_utils.getStaticValue(fastn_utils.getterByKey(value, index));
    },

    component_data(component) {
        let attributesIndex = component.getAttribute(fastn_dom.webComponentArgument);
        let attributes = fastn_dom.webComponent[attributesIndex];
        return Object.fromEntries(
            Object.entries(attributes).map(([k,v]) => {
                // Todo: check if argument is mutable reference or not
                    if (v instanceof fastn.mutableClass) {
                        v = fastn.webComponentVariable.mutable(v);
                    } else if (v instanceof fastn.mutableListClass) {
                        v = fastn.webComponentVariable.mutableList(v);
                    } else if (v instanceof fastn.recordInstanceClass) {
                        v = fastn.webComponentVariable.record(v);
                    } else {
                        v = fastn.webComponentVariable.static(v);
                    }
                    return [k, v];
                }
            )
        );
    }
};

// ftd.append($a = $people, v = Tom)
ftd.append = function (list, item) { list.push(item) }
ftd.pop = function (list) { list.pop() }
ftd.insert_at = function (list, index, item) { list.insertAt(index, item) }
ftd.delete_at = function (list, index) { list.deleteAt(index) }
ftd.clear_all = function (list) { list.clearAll() }
ftd.clear = ftd.clear_all;
ftd.set_list = function (list, value) { list.set(value) }

ftd.http = function (url, method, body, headers) {
    if (url instanceof fastn.mutableClass) url = url.get();
    if (method instanceof fastn.mutableClass) method = method.get();
    method = method.trim().toUpperCase();
    const init = {
        method,
        headers: {}
    };
    if(headers && headers instanceof fastn.recordInstanceClass) {
        Object.assign(init.headers, headers.toObject());
    }
    if(method !== 'GET') {
        init.headers['Content-Type'] = 'application/json';
    }
    if(body && body instanceof fastn.recordInstanceClass && method !== 'GET') {
        init.body = JSON.stringify(body.toObject());
    }
    fetch(url, init)
    .then(res => {
        if(!res.ok) {
            return new Error("[http]: Request failed", res)
        }

        return res.json();
    })
    .then(json => {
        console.log("[http]: Response OK", json);
    })
    .catch(console.error);
}

ftd.navigate = function(url, request_data) {
    let query_parameters = new URLSearchParams();
    if(request_data instanceof RecordInstance) {
        // @ts-ignore
        for (let [header, value] of Object.entries(request_data.toObject())) {
            if (header != "url" && header != "function" && header != "method") {
                let [key, val] = value.length == 2 ? value : [header, value];
                query_parameters.set(key, val);
            }
        }
    }
    let query_string = query_parameters.toString();
    if (query_string) {
        let get_url = url + "?" + query_parameters.toString();
        window.location.href = get_url;
    }
    else {
        window.location.href = url;
    }
}

ftd.toggle_dark_mode = function () {
    const is_dark_mode = ftd.get(ftd.dark_mode);
    if(is_dark_mode) {
        enable_light_mode();
    } else {
        enable_dark_mode();
    }
};

const len = ftd.len;

ftd.local_storage = {
    _get_key(key) {
        if (key instanceof fastn.mutableClass) {
            key = key.get();
        }
        const packageNamePrefix = __fastn_package_name__ ? `${__fastn_package_name__}_` : "";
        const snakeCaseKey = fastn_utils.toSnakeCase(key);
    
        return `${packageNamePrefix}${snakeCaseKey}`;
    },
    set(key, value) {
        key = this._get_key(key);
        value = fastn_utils.getFlattenStaticValue(value);
        localStorage.setItem(key, value && typeof value === 'object' ? JSON.stringify(value) : value);
    },
    get(key) {
        key = this._get_key(key);
        if(ssr && !hydrating) {
            return;
        }
        const item = localStorage.getItem(key);
        if(!item) {
            return;
        }
        try {
            const obj = JSON.parse(item);

            return fastn_utils.staticToMutables(obj);
        } catch {
            return item;
        }
    },
    delete(key) {
        key = this._get_key(key);
        localStorage.removeItem(key);
    }
}
class MutableVariable {
    #value;
    constructor(value) {
        this.#value = value;
    }

    get() {
        return fastn_utils.getStaticValue(this.#value);
    }

    set(value) {
        this.#value.set(value);
    }
    // Todo: Remove closure when node is removed.
    on_change(func) {
        this.#value.addClosure(fastn.closureWithoutExecute(func));
    }
}

class MutableListVariable {
    #value;
    constructor(value) {
        this.#value = value;
    }
    get() {
        return fastn_utils.getStaticValue(this.#value);
    }
    set(index, list) {
        if (list === undefined) {
            this.#value.set(fastn_utils.staticToMutables(index));
            return;
        }
        this.#value.set(index, fastn_utils.staticToMutables(list));
    }
    insertAt(index, value) {
        this.#value.insertAt(index, fastn_utils.staticToMutables(value))
    }
    deleteAt(index) {
        this.#value.deleteAt(index);
    }
    push(value) {
        this.#value.push(value);
    }
    pop() {
        this.#value.pop()
    }
    clearAll() {
        this.#value.clearAll()
    }
    on_change(func) {
        this.#value.addClosure(fastn.closureWithoutExecute(func));
    }
}

class RecordVariable {
    #value;
    constructor(value) {
        this.#value = value;
    }

    get() {
        return fastn_utils.getStaticValue(this.#value);
    }

    set(record) {
        this.#value.set(fastn_utils.staticToMutables(record));
    }

    on_change(func) {
        this.#value.addClosure(fastn.closureWithoutExecute(func));
    }
}
class StaticVariable {
    #value;
    #closures;
    constructor(value) {
        this.#value = value;
        this.#closures = [];
        if (this.#value instanceof fastn.mutableClass) {
            this.#value.addClosure(fastn.closure(() => this.#closures.forEach((closure) => closure.update())));
        }
    }

    get() {
        return fastn_utils.getStaticValue(this.#value);
    }

    on_change(func) {
        if (this.#value instanceof fastn.mutableClass) {
            this.#value.addClosure(fastn.closure(func));
        }
    }
}

fastn.webComponentVariable =  {
    mutable: (value) => {
        return new MutableVariable(value);
    },
    mutableList: (value) => {
        return new MutableListVariable(value);
    },
    static: (value) => {
        return new StaticVariable(value);
    },
    record: (value) => {
        return new RecordVariable(value);
    },
}
ftd.clickOutsideEvents = [];
ftd.globalKeyEvents = [];
ftd.globalKeySeqEvents = [];

ftd.post_init = function () {
    const DARK_MODE_COOKIE = "fastn-dark-mode";
    const COOKIE_SYSTEM_LIGHT = "system-light";
    const COOKIE_SYSTEM_DARK = "system-dark";
    const COOKIE_DARK_MODE = "dark";
    const COOKIE_LIGHT_MODE = "light";
    const DARK_MODE_CLASS = "dark";
    const MOBILE_CLASS = "mobile";
    let last_device = "desktop";

    window.onresize = function () {
        initialise_device()
    };
    function initialise_click_outside_events() {
        document.addEventListener("click", function (event) {
            ftd.clickOutsideEvents.forEach(([ftdNode, func]) => {
                let node = ftdNode.getNode();
                if (!!node && node.style.display !== "none" && !node.contains(event.target)) {
                    func();
                }
            })
        })
    }
    function initialise_global_key_events() {
        let globalKeys = {};
        let buffer = [];
        let lastKeyTime = Date.now();

        document.addEventListener("keydown", function (event) {
            let eventKey =  fastn_utils.getEventKey(event);
            globalKeys[eventKey] = true;
            const currentTime = Date.now();
            if (currentTime - lastKeyTime > 1000) {
                buffer = [];
            }
            lastKeyTime = currentTime;
            if ((event.target.nodeName === "INPUT" || event.target.nodeName === "TEXTAREA")
            && (eventKey !== "ArrowDown" && eventKey !== "ArrowUp" &&
                    eventKey !== "ArrowRight" && eventKey !== "ArrowLeft")
             && (event.target.nodeName === "INPUT" && eventKey !== "Enter")) {
                return;
            }
            buffer.push(eventKey);

            ftd.globalKeyEvents.forEach(([_ftdNode, func, array]) => {
                let globalKeysPresent = array.reduce((accumulator, currentValue) => accumulator && !!globalKeys[currentValue], true);
                if (globalKeysPresent && buffer.join(',').includes(array.join(','))) {
                    func();
                    globalKeys[eventKey] = false;
                    buffer = [];
                }
                return;
            })

            ftd.globalKeySeqEvents.forEach(([_ftdNode, func, array]) => {
                if (buffer.join(',').includes(array.join(','))) {
                    func();
                    globalKeys[eventKey] = false;
                    buffer = [];
                }
                return;
            })
        })

        document.addEventListener("keyup", function(event) {
            globalKeys[fastn_utils.getEventKey(event)] = false;
        })
    }
    function initialise_device() {
        let current = get_device();
        if (current === last_device) {
            return;
        }
        console.log("last_device", last_device, "current_device", current);
        ftd.device.set(current);
        last_device = current;
    }

    function get_device() {
        // not at all sure about this function logic.
        let width = window.innerWidth;
        // In the future, we may want to have more than one break points, and
        // then we may also want the theme builders to decide where the
        // breakpoints should go. we should be able to fetch fpm variables
        // here, or maybe simply pass the width, user agent etc. to fpm and
        // let people put the checks on width user agent etc., but it would
        // be good if we can standardize few breakpoints. or maybe we should
        // do both, some standard breakpoints and pass the raw data.
        // we would then rename this function to detect_device() which will
        // return one of "desktop", "mobile". and also maybe have another
        // function detect_orientation(), "landscape" and "portrait" etc.,
        // and instead of setting `ftd#mobile: boolean` we set `ftd#device`
        // and `ftd#view-port-orientation` etc.
        let mobile_breakpoint = fastn_utils.getStaticValue(ftd.breakpoint_width.get("mobile"));
        if (width <= mobile_breakpoint) {
            document.body.classList.add(MOBILE_CLASS);
            return fastn_dom.DeviceData.Mobile;
        }
        if (document.body.classList.contains(MOBILE_CLASS)) {
            document.body.classList.remove(MOBILE_CLASS);
        }
        return fastn_dom.DeviceData.Desktop;
    }

    /*
        ftd.dark-mode behaviour:

        ftd.dark-mode is a boolean, default false, it tells the UI to show
        the UI in dark or light mode. Themes should use this variable to decide
        which mode to show in UI.

        ftd.follow-system-dark-mode, boolean, default true, keeps track if
        we are reading the value of `dark-mode` from system preference, or user
        has overridden the system preference.

        These two variables must not be set by ftd code directly, but they must
        use `$on-click$: message-host enable-dark-mode`, to ignore system
        preference and use dark mode. `$on-click$: message-host
        disable-dark-mode` to ignore system preference and use light mode and
        `$on-click$: message-host follow-system-dark-mode` to ignore user
        preference and start following system preference.

        we use a cookie: `ftd-dark-mode` to store the preference. The cookie can
        have three values:

           cookie missing /          user wants us to honour system preference
               system-light          and currently its light.

           system-dark               follow system and currently its dark.

           light:                    user prefers light

           dark:                     user prefers light

        We use cookie instead of localstorage so in future `fpm-repo` can see
        users preferences up front and renders the HTML on service wide
        following user's preference.

     */
    window.enable_dark_mode = function () {
        // TODO: coalesce the two set_bool-s into one so there is only one DOM
        //       update
        ftd.dark_mode.set(true);
        ftd.follow_system_dark_mode.set(false);
        ftd.system_dark_mode.set(system_dark_mode());
        document.body.classList.add(DARK_MODE_CLASS);
        set_cookie(DARK_MODE_COOKIE, COOKIE_DARK_MODE);
    };
    window.enable_light_mode = function () {
        // TODO: coalesce the two set_bool-s into one so there is only one DOM
        //       update
        ftd.dark_mode.set(false);
        ftd.follow_system_dark_mode.set(false);
        ftd.system_dark_mode.set(system_dark_mode());
        if (document.body.classList.contains(DARK_MODE_CLASS)) {
            document.body.classList.remove(DARK_MODE_CLASS);
        }
        set_cookie(DARK_MODE_COOKIE, COOKIE_LIGHT_MODE);
    };
    window.enable_system_mode = function () {
        // TODO: coalesce the two set_bool-s into one so there is only one DOM
        //       update
        let systemMode = system_dark_mode();
        ftd.follow_system_dark_mode.set(true);
        ftd.system_dark_mode.set(systemMode);
        if (systemMode) {
            ftd.dark_mode.set(true);
            document.body.classList.add(DARK_MODE_CLASS);
            set_cookie(DARK_MODE_COOKIE, COOKIE_SYSTEM_DARK);
        }
        else {
            ftd.dark_mode.set(false);
            if (document.body.classList.contains(DARK_MODE_CLASS)) {
                document.body.classList.remove(DARK_MODE_CLASS);
            }
            set_cookie(DARK_MODE_COOKIE, COOKIE_SYSTEM_LIGHT);
        }
    };
    function set_cookie(name, value) {
        document.cookie = name + "=" + value + "; path=/";
    }
    function system_dark_mode() {
        return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    function initialise_dark_mode() {
        update_dark_mode();
        start_watching_dark_mode_system_preference();
    }
    function get_cookie(name, def) {
        // source: https://stackoverflow.com/questions/5639346/
        let regex = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return regex !== null ? regex.pop() : def;
    }
    function update_dark_mode() {
        let current_dark_mode_cookie = get_cookie(DARK_MODE_COOKIE, COOKIE_SYSTEM_LIGHT);
        switch (current_dark_mode_cookie) {
            case COOKIE_SYSTEM_LIGHT:
            case COOKIE_SYSTEM_DARK:
                window.enable_system_mode();
                break;
            case COOKIE_LIGHT_MODE:
                window.enable_light_mode();
                break;
            case COOKIE_DARK_MODE:
                window.enable_dark_mode();
                break;
            default:
                console_log("cookie value is wrong", current_dark_mode_cookie);
                window.enable_system_mode();
        }
    }
    function start_watching_dark_mode_system_preference() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", update_dark_mode);
    }
    initialise_dark_mode();
    initialise_device();
    initialise_click_outside_events();
    initialise_global_key_events();
    fastn_utils.resetFullHeight();
    fastn_utils.setFullHeight();
}

window.ftd = ftd;

ftd.toggle = function (args) {
  let __fastn_super_package_name__ = __fastn_package_name__;
  __fastn_package_name__ = "hacktree_in";
  try {
    let __args__ = fastn_utils.getArgs({
    }, args);
    let fastn_utils_val___args___a = fastn_utils.clone(!fastn_utils.getter(__args__.a));
    if (fastn_utils_val___args___a instanceof fastn.mutableClass) {
      fastn_utils_val___args___a = fastn_utils_val___args___a.get();
    }
    if (!fastn_utils.setter(__args__.a, fastn_utils_val___args___a)) {
      __args__.a = fastn_utils_val___args___a;
    }
  } finally {
    __fastn_package_name__ = __fastn_super_package_name__;
  }
}
ftd.increment = function (args) {
  let __fastn_super_package_name__ = __fastn_package_name__;
  __fastn_package_name__ = "hacktree_in";
  try {
    let __args__ = fastn_utils.getArgs({
    }, args);
    let fastn_utils_val___args___a = fastn_utils.clone(fastn_utils.getter(__args__.a) + 1);
    if (fastn_utils_val___args___a instanceof fastn.mutableClass) {
      fastn_utils_val___args___a = fastn_utils_val___args___a.get();
    }
    if (!fastn_utils.setter(__args__.a, fastn_utils_val___args___a)) {
      __args__.a = fastn_utils_val___args___a;
    }
  } finally {
    __fastn_package_name__ = __fastn_super_package_name__;
  }
}
ftd.increment_by = function (args) {
  let __fastn_super_package_name__ = __fastn_package_name__;
  __fastn_package_name__ = "hacktree_in";
  try {
    let __args__ = fastn_utils.getArgs({
    }, args);
    let fastn_utils_val___args___a = fastn_utils.clone(fastn_utils.getter(__args__.a) + fastn_utils.getter(__args__.v));
    if (fastn_utils_val___args___a instanceof fastn.mutableClass) {
      fastn_utils_val___args___a = fastn_utils_val___args___a.get();
    }
    if (!fastn_utils.setter(__args__.a, fastn_utils_val___args___a)) {
      __args__.a = fastn_utils_val___args___a;
    }
  } finally {
    __fastn_package_name__ = __fastn_super_package_name__;
  }
}
ftd.enable_light_mode = function (args) {
  let __fastn_super_package_name__ = __fastn_package_name__;
  __fastn_package_name__ = "hacktree_in";
  try {
    let __args__ = fastn_utils.getArgs({
    }, args);
    return (enable_light_mode());
  } finally {
    __fastn_package_name__ = __fastn_super_package_name__;
  }
}
ftd.enable_dark_mode = function (args) {
  let __fastn_super_package_name__ = __fastn_package_name__;
  __fastn_package_name__ = "hacktree_in";
  try {
    let __args__ = fastn_utils.getArgs({
    }, args);
    return (enable_dark_mode());
  } finally {
    __fastn_package_name__ = __fastn_super_package_name__;
  }
}
ftd.enable_system_mode = function (args) {
  let __fastn_super_package_name__ = __fastn_package_name__;
  __fastn_package_name__ = "hacktree_in";
  try {
    let __args__ = fastn_utils.getArgs({
    }, args);
    return (enable_system_mode());
  } finally {
    __fastn_package_name__ = __fastn_super_package_name__;
  }
}
ftd.set_bool = function (args) {
  let __fastn_super_package_name__ = __fastn_package_name__;
  __fastn_package_name__ = "hacktree_in";
  try {
    let __args__ = fastn_utils.getArgs({
    }, args);
    let fastn_utils_val___args___a = fastn_utils.clone(__args__.v);
    if (fastn_utils_val___args___a instanceof fastn.mutableClass) {
      fastn_utils_val___args___a = fastn_utils_val___args___a.get();
    }
    if (!fastn_utils.setter(__args__.a, fastn_utils_val___args___a)) {
      __args__.a = fastn_utils_val___args___a;
    }
  } finally {
    __fastn_package_name__ = __fastn_super_package_name__;
  }
}
ftd.set_boolean = function (args) {
  let __fastn_super_package_name__ = __fastn_package_name__;
  __fastn_package_name__ = "hacktree_in";
  try {
    let __args__ = fastn_utils.getArgs({
    }, args);
    let fastn_utils_val___args___a = fastn_utils.clone(__args__.v);
    if (fastn_utils_val___args___a instanceof fastn.mutableClass) {
      fastn_utils_val___args___a = fastn_utils_val___args___a.get();
    }
    if (!fastn_utils.setter(__args__.a, fastn_utils_val___args___a)) {
      __args__.a = fastn_utils_val___args___a;
    }
  } finally {
    __fastn_package_name__ = __fastn_super_package_name__;
  }
}
ftd.set_string = function (args) {
  let __fastn_super_package_name__ = __fastn_package_name__;
  __fastn_package_name__ = "hacktree_in";
  try {
    let __args__ = fastn_utils.getArgs({
    }, args);
    let fastn_utils_val___args___a = fastn_utils.clone(__args__.v);
    if (fastn_utils_val___args___a instanceof fastn.mutableClass) {
      fastn_utils_val___args___a = fastn_utils_val___args___a.get();
    }
    if (!fastn_utils.setter(__args__.a, fastn_utils_val___args___a)) {
      __args__.a = fastn_utils_val___args___a;
    }
  } finally {
    __fastn_package_name__ = __fastn_super_package_name__;
  }
}
ftd.set_integer = function (args) {
  let __fastn_super_package_name__ = __fastn_package_name__;
  __fastn_package_name__ = "hacktree_in";
  try {
    let __args__ = fastn_utils.getArgs({
    }, args);
    let fastn_utils_val___args___a = fastn_utils.clone(__args__.v);
    if (fastn_utils_val___args___a instanceof fastn.mutableClass) {
      fastn_utils_val___args___a = fastn_utils_val___args___a.get();
    }
    if (!fastn_utils.setter(__args__.a, fastn_utils_val___args___a)) {
      __args__.a = fastn_utils_val___args___a;
    }
  } finally {
    __fastn_package_name__ = __fastn_super_package_name__;
  }
}
ftd.dark_mode = fastn.mutable(false);
ftd.empty = "";
ftd.space = " ";
ftd.nbsp = "&nbsp;";
ftd.non_breaking_space = "&nbsp;";
ftd.system_dark_mode = fastn.mutable(false);
ftd.follow_system_dark_mode = fastn.mutable(true);
ftd.font_display = fastn.mutable("sans-serif");
ftd.font_copy = fastn.mutable("sans-serif");
ftd.font_code = fastn.mutable("sans-serif");
ftd.default_types = fastn.recordInstance({
  heading_large: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(65),
      size: fastn_dom.FontSize.Px(50),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(54),
      size: fastn_dom.FontSize.Px(36),
      weight: 400
    })
  }),
  heading_medium: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(57),
      size: fastn_dom.FontSize.Px(38),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(40),
      size: fastn_dom.FontSize.Px(26),
      weight: 400
    })
  }),
  heading_small: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(31),
      size: fastn_dom.FontSize.Px(24),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(29),
      size: fastn_dom.FontSize.Px(22),
      weight: 400
    })
  }),
  heading_hero: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(104),
      size: fastn_dom.FontSize.Px(80),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(64),
      size: fastn_dom.FontSize.Px(48),
      weight: 400
    })
  }),
  heading_tiny: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(26),
      size: fastn_dom.FontSize.Px(20),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(24),
      size: fastn_dom.FontSize.Px(18),
      weight: 400
    })
  }),
  copy_small: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_copy,
      line_height: fastn_dom.FontSize.Px(24),
      size: fastn_dom.FontSize.Px(14),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_copy,
      line_height: fastn_dom.FontSize.Px(16),
      size: fastn_dom.FontSize.Px(12),
      weight: 400
    })
  }),
  copy_regular: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_copy,
      line_height: fastn_dom.FontSize.Px(30),
      size: fastn_dom.FontSize.Px(18),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_copy,
      line_height: fastn_dom.FontSize.Px(24),
      size: fastn_dom.FontSize.Px(16),
      weight: 400
    })
  }),
  copy_large: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_copy,
      line_height: fastn_dom.FontSize.Px(34),
      size: fastn_dom.FontSize.Px(22),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_copy,
      line_height: fastn_dom.FontSize.Px(28),
      size: fastn_dom.FontSize.Px(18),
      weight: 400
    })
  }),
  fine_print: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_code,
      line_height: fastn_dom.FontSize.Px(16),
      size: fastn_dom.FontSize.Px(12),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_code,
      line_height: fastn_dom.FontSize.Px(16),
      size: fastn_dom.FontSize.Px(12),
      weight: 400
    })
  }),
  blockquote: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_code,
      line_height: fastn_dom.FontSize.Px(21),
      size: fastn_dom.FontSize.Px(16),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_code,
      line_height: fastn_dom.FontSize.Px(21),
      size: fastn_dom.FontSize.Px(16),
      weight: 400
    })
  }),
  source_code: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_code,
      line_height: fastn_dom.FontSize.Px(30),
      size: fastn_dom.FontSize.Px(18),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_code,
      line_height: fastn_dom.FontSize.Px(21),
      size: fastn_dom.FontSize.Px(16),
      weight: 400
    })
  }),
  button_small: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(19),
      size: fastn_dom.FontSize.Px(14),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(19),
      size: fastn_dom.FontSize.Px(14),
      weight: 400
    })
  }),
  button_medium: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(21),
      size: fastn_dom.FontSize.Px(16),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(21),
      size: fastn_dom.FontSize.Px(16),
      weight: 400
    })
  }),
  button_large: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(24),
      size: fastn_dom.FontSize.Px(18),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(24),
      size: fastn_dom.FontSize.Px(18),
      weight: 400
    })
  }),
  link: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(19),
      size: fastn_dom.FontSize.Px(14),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(19),
      size: fastn_dom.FontSize.Px(14),
      weight: 400
    })
  }),
  label_large: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(19),
      size: fastn_dom.FontSize.Px(14),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(19),
      size: fastn_dom.FontSize.Px(14),
      weight: 400
    })
  }),
  label_small: fastn.recordInstance({
    desktop: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(16),
      size: fastn_dom.FontSize.Px(12),
      weight: 400
    }),
    mobile: fastn.recordInstance({
      font_family: ftd.font_display,
      line_height: fastn_dom.FontSize.Px(16),
      size: fastn_dom.FontSize.Px(12),
      weight: 400
    })
  })
});
ftd.default_colors = fastn.recordInstance({
  background: fastn.recordInstance({
    base: fastn.recordInstance({
      dark: "#18181b",
      light: "#e7e7e4"
    }),
    code: fastn.recordInstance({
      dark: "#21222C",
      light: "#F5F5F5"
    }),
    overlay: fastn.recordInstance({
      dark: "rgba(0, 0, 0, 0.8)",
      light: "rgba(0, 0, 0, 0.8)"
    }),
    step_1: fastn.recordInstance({
      dark: "#141414",
      light: "#f3f3f3"
    }),
    step_2: fastn.recordInstance({
      dark: "#585656",
      light: "#c9cece"
    })
  }),
  border: fastn.recordInstance({
    dark: "#434547",
    light: "#434547"
  }),
  border_strong: fastn.recordInstance({
    dark: "#919192",
    light: "#919192"
  }),
  text: fastn.recordInstance({
    dark: "#a8a29e",
    light: "#584b42"
  }),
  text_strong: fastn.recordInstance({
    dark: "#ffffff",
    light: "#141414"
  }),
  shadow: fastn.recordInstance({
    dark: "#007f9b",
    light: "#007f9b"
  }),
  scrim: fastn.recordInstance({
    dark: "#007f9b",
    light: "#007f9b"
  }),
  cta_primary: fastn.recordInstance({
    base: fastn.recordInstance({
      dark: "#2dd4bf",
      light: "#2dd4bf"
    }),
    border: fastn.recordInstance({
      dark: "#2b8074",
      light: "#2b8074"
    }),
    border_disabled: fastn.recordInstance({
      dark: "#65b693",
      light: "#65b693"
    }),
    disabled: fastn.recordInstance({
      dark: "rgba(44, 201, 181, 0.1)",
      light: "rgba(44, 201, 181, 0.1)"
    }),
    focused: fastn.recordInstance({
      dark: "#2cbfac",
      light: "#2cbfac"
    }),
    hover: fastn.recordInstance({
      dark: "#2c9f90",
      light: "#2c9f90"
    }),
    pressed: fastn.recordInstance({
      dark: "#2cc9b5",
      light: "#2cc9b5"
    }),
    text: fastn.recordInstance({
      dark: "#feffff",
      light: "#feffff"
    }),
    text_disabled: fastn.recordInstance({
      dark: "#65b693",
      light: "#65b693"
    })
  }),
  cta_secondary: fastn.recordInstance({
    base: fastn.recordInstance({
      dark: "#4fb2df",
      light: "#4fb2df"
    }),
    border: fastn.recordInstance({
      dark: "#209fdb",
      light: "#209fdb"
    }),
    border_disabled: fastn.recordInstance({
      dark: "#65b693",
      light: "#65b693"
    }),
    disabled: fastn.recordInstance({
      dark: "rgba(79, 178, 223, 0.1)",
      light: "rgba(79, 178, 223, 0.1)"
    }),
    focused: fastn.recordInstance({
      dark: "#4fb1df",
      light: "#4fb1df"
    }),
    hover: fastn.recordInstance({
      dark: "#40afe1",
      light: "#40afe1"
    }),
    pressed: fastn.recordInstance({
      dark: "#4fb2df",
      light: "#4fb2df"
    }),
    text: fastn.recordInstance({
      dark: "#ffffff",
      light: "#584b42"
    }),
    text_disabled: fastn.recordInstance({
      dark: "#65b693",
      light: "#65b693"
    })
  }),
  cta_tertiary: fastn.recordInstance({
    base: fastn.recordInstance({
      dark: "#556375",
      light: "#556375"
    }),
    border: fastn.recordInstance({
      dark: "#e2e4e7",
      light: "#e2e4e7"
    }),
    border_disabled: fastn.recordInstance({
      dark: "#65b693",
      light: "#65b693"
    }),
    disabled: fastn.recordInstance({
      dark: "rgba(85, 99, 117, 0.1)",
      light: "rgba(85, 99, 117, 0.1)"
    }),
    focused: fastn.recordInstance({
      dark: "#e0e2e6",
      light: "#e0e2e6"
    }),
    hover: fastn.recordInstance({
      dark: "#c7cbd1",
      light: "#c7cbd1"
    }),
    pressed: fastn.recordInstance({
      dark: "#3b4047",
      light: "#3b4047"
    }),
    text: fastn.recordInstance({
      dark: "#ffffff",
      light: "#ffffff"
    }),
    text_disabled: fastn.recordInstance({
      dark: "#65b693",
      light: "#65b693"
    })
  }),
  cta_danger: fastn.recordInstance({
    base: fastn.recordInstance({
      dark: "#1C1B1F",
      light: "#1C1B1F"
    }),
    border: fastn.recordInstance({
      dark: "#1C1B1F",
      light: "#1C1B1F"
    }),
    border_disabled: fastn.recordInstance({
      dark: "#feffff",
      light: "#feffff"
    }),
    disabled: fastn.recordInstance({
      dark: "#1C1B1F",
      light: "#1C1B1F"
    }),
    focused: fastn.recordInstance({
      dark: "#1C1B1F",
      light: "#1C1B1F"
    }),
    hover: fastn.recordInstance({
      dark: "#1C1B1F",
      light: "#1C1B1F"
    }),
    pressed: fastn.recordInstance({
      dark: "#1C1B1F",
      light: "#1C1B1F"
    }),
    text: fastn.recordInstance({
      dark: "#1C1B1F",
      light: "#1C1B1F"
    }),
    text_disabled: fastn.recordInstance({
      dark: "#feffff",
      light: "#feffff"
    })
  }),
  accent: fastn.recordInstance({
    primary: fastn.recordInstance({
      dark: "#2dd4bf",
      light: "#2dd4bf"
    }),
    secondary: fastn.recordInstance({
      dark: "#4fb2df",
      light: "#4fb2df"
    }),
    tertiary: fastn.recordInstance({
      dark: "#c5cbd7",
      light: "#c5cbd7"
    })
  }),
  error: fastn.recordInstance({
    base: fastn.recordInstance({
      dark: "#311b1f",
      light: "#f5bdbb"
    }),
    border: fastn.recordInstance({
      dark: "#df2b2b",
      light: "#df2b2b"
    }),
    text: fastn.recordInstance({
      dark: "#c62a21",
      light: "#c62a21"
    })
  }),
  success: fastn.recordInstance({
    base: fastn.recordInstance({
      dark: "#405508ad",
      light: "#e3f0c4"
    }),
    border: fastn.recordInstance({
      dark: "#3d741f",
      light: "#3d741f"
    }),
    text: fastn.recordInstance({
      dark: "#479f16",
      light: "#467b28"
    })
  }),
  info: fastn.recordInstance({
    base: fastn.recordInstance({
      dark: "#15223a",
      light: "#c4edfd"
    }),
    border: fastn.recordInstance({
      dark: "#205694",
      light: "#205694"
    }),
    text: fastn.recordInstance({
      dark: "#1f6feb",
      light: "#205694"
    })
  }),
  warning: fastn.recordInstance({
    base: fastn.recordInstance({
      dark: "#544607a3",
      light: "#fbefba"
    }),
    border: fastn.recordInstance({
      dark: "#966220",
      light: "#966220"
    }),
    text: fastn.recordInstance({
      dark: "#d07f19",
      light: "#966220"
    })
  }),
  custom: fastn.recordInstance({
    eight: fastn.recordInstance({
      dark: "#d554b3",
      light: "#d554b3"
    }),
    five: fastn.recordInstance({
      dark: "#eb57be",
      light: "#eb57be"
    }),
    four: fastn.recordInstance({
      dark: "#7a65c7",
      light: "#7a65c7"
    }),
    nine: fastn.recordInstance({
      dark: "#ec8943",
      light: "#ec8943"
    }),
    one: fastn.recordInstance({
      dark: "#ed753a",
      light: "#ed753a"
    }),
    seven: fastn.recordInstance({
      dark: "#7564be",
      light: "#7564be"
    }),
    six: fastn.recordInstance({
      dark: "#ef8dd6",
      light: "#ef8dd6"
    }),
    ten: fastn.recordInstance({
      dark: "#da7a4a",
      light: "#da7a4a"
    }),
    three: fastn.recordInstance({
      dark: "#8fdcf8",
      light: "#8fdcf8"
    }),
    two: fastn.recordInstance({
      dark: "#f3db5f",
      light: "#f3db5f"
    })
  })
});
ftd.breakpoint_width = fastn.recordInstance({
  mobile: 768
});
ftd.device = fastn.mutable(fastn_dom.DeviceData.Desktop);
let inherited = fastn.recordInstance({
  colors: ftd.default_colors.getClone().setAndReturn("is_root", true),
  types: ftd.default_types.getClone().setAndReturn("is_root", true)
});
