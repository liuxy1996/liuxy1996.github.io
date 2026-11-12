(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,87784,t=>{t.v(a=>Promise.all(["static/chunks/3kyy1f1wg54dz.js","static/chunks/1_lcdafx7h0dl.js"].map(a=>t.l(a))).then(()=>a(69050)))},18906,t=>{"use strict";var a=t.i(43476),s=t.i(70703),n=t.i(71645),e=t.i(57675);let l=(0,s.default)(()=>t.A(87784).then(t=>t.RemoteCodeDialog),{loadableGenerated:{modules:[69050]},ssr:!1}),o={rust:`fn main() {
    let languages = ["Rust", "Java", "Python"];
    for language in languages {
        println!("learning {language}");
    }
}`,java:`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from On Java 8");
    }
}`};t.s(["RemotePlayground",0,function(){let[t,s]=(0,n.useState)(null);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"remote-playground-actions",children:[(0,a.jsxs)("button",{type:"button",className:"button button-ghost",onClick:()=>s("rust"),children:[(0,a.jsx)(e.o,{}),"运行 Rust 示例"]}),(0,a.jsxs)("button",{type:"button",className:"button button-ghost",onClick:()=>s("java"),children:[(0,a.jsx)(e.o,{}),"运行 Java 示例"]})]}),t&&(0,a.jsx)(l,{initialCode:o[t],language:t,title:"rust"===t?"Rust 在线运行器":"Java 在线运行器",subtitle:"可以修改示例；代码只在你点击运行时发送到远程编译器。",onClose:()=>s(null)})]})}])},47843,t=>{t.v(a=>Promise.all(["static/chunks/3hzutawhy0ewy.js","static/chunks/3kyy1f1wg54dz.js"].map(a=>t.l(a))).then(()=>a(61577)))}]);