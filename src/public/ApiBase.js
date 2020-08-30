//初始化Api
const AV = require('leancloud-storage');

AV.init({
    appId: "yiwO01qiqPS0vLB7J0OhU7hP-gzGzoHsz",
    appKey: "Dma5LGO1TSgx0TQrBpSpdO5a",
    serverURL: "https://yiwo01qi.lc-cn-n1-shared.com"
});

export { 
    AV
}