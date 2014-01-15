﻿// ==UserScript==
// @name           Guokr
// @author         nasdaq,猪了个去
// @description    果壳网增强扩展
// @version        1.4.0.7
// @namespace      http://www.guokr.com/
// @download       http://userscripts.org/scripts/show/129841
// @include        http://www.guokr.com/*
// @grant          none
// ==/UserScript==

(function() {



    // ※※※注意！脚本必须以UTF-8编码保存！※※※
    //开启/关闭日志输出
    var debugMode = true;
    // 持久化屏蔽ID列表, e.g. :   var ids = ["0792011715","0020566516","0814609355","0637014415"];  
    var ids = [];
    // 持久化屏蔽关键词列表, e.g. : var strs = ["中医","经络","针灸"];
    var strs = [];
    // 常用表情(可以根据需要修改,注意最后一行没有逗号)
    var faces = [
       
     ];
     
    var defaultFaces = [
    "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/b6/kbs_org.gif",
    "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c2/tooth.gif",
    "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/1b/gz_org.gif",
    "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/24/sweata_thumb.gif",
    "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/af/kl_thumb.gif",
    "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/shamea_thumb.gif",
    "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/19/dinmotou_thumb.gif",
    "http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6d/lovea_thumb.gif"
    ];
    
    //更多表情(可以根据需要修改,注意最后一行没有逗号)
    var moreFaces = [
        
    ];
    
    //默认表情列表
    var defaultMoreFaces = [
        {name : "默认" ,faces : ["http://ww2.sinaimg.cn/large/7e2ea99egw1du0by6k9ieg.gif","http://img1.guokr.com/gkimage/cx/xc/xt/cxxcxt.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d8/sad.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/71/bs2_org.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/b8/cz_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/4d/crazy.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/19/hate.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7c/bb_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/57/angry.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/13/sweat.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/8b/sleepy.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/05/shame_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7d/sleep_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/90/money_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7e/hei_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/40/cool_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/af/cry.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f4/cj_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/29/bz_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/71/bs2_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/b6/kbs_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/64/hs_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/1b/gz_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/e9/sk_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/b6/sb_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/8f/qq_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/89/nm_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/58/mb_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/17/ldln_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/98/yhh_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6d/zhh_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/73/wq_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/9e/t_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/af/kl_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f3/k_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/5c/yw_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/40/come_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6d/heart.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c3/liaobuqi_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/66/guanbuzhao_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/78/2guanbuzhao1_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/09/ai_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/11/2liaobuqiai_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/68/youdiankun_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/9e/yes_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/72/yanhuiqule_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/01/yalihenda_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/42/xiuxiu_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6b/xihuang_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a0/xiaobianpi_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d6/wunai22_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/da/tutu_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/98/tushetou_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/48/touyun_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d3/tingyinyue_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/65/shuijiao_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/4b/paoxiao_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/2c/motou_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d2/meihao_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d8/lianhongzibao_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/1c/kuqinv_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/38/kuqinan_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/fd/kong_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/9f/jinqingwan_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/b8/jingxi_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/58/jingdai_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/e1/huluobo_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/63/huangtengquai_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/67/ganmao_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ef/fennu_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a6/fendou123_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/95/faya_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ca/chunnuanhuakai_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/83/chouyan_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/31/ang_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/12/aa_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d3/zichashuangmu_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/9f/yiwen_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/cf/xu_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/00/wochiwode_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a7/weiqu_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c5/v5_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f7/tiaoxi_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d7/taihaoxiaole_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/b8/shoujian_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a1/se_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/4a/pen_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/2e/nidongde_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a0/miaomiao_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c1/meiwei_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/46/jingkong_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7c/gandong_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/55/fangkai_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/e8/chidai_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/99/chelian_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ab/buzhisuocuo_thumb.gif","http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/24/baiyan_thumb.gif"]},
        {name : "暴漫" ,faces : ["http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/09/bmzuocao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/60/bmzhuakuang_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ff/bmzhongqiang_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/63/bmzhenjing_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c9/bmzan_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/47/bmxiyue_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/bmxingwu_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a7/bmxingfen_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0d/bmxielei_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/bd/bmwabikong_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/bmtushetou_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/73/bmtucao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/04/bmtousu_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/2a/bmtiaosheng_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/da/bmtiaopi_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/20/bmtaolun_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/86/bmtaitui_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0f/bmsikao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8f/bmshengqi_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a4/bmqinwen_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6c/bmqingxing_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/66/bmneihan_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/18/bmmanglu_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a9/bmluanru_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ba/bmluanmeng_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d6/bmliulei_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a4/bmliukoushui_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4f/bmliubiti_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/75/bmliguo_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3e/bmliezui_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4e/bmlaladui_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9b/bmkusu_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a8/bmkuqi_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/dc/bmkubi_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0c/bmkoushao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/95/bmkeai_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4c/bmjinzhang_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/03/bmjingya_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/be/bmjingxia_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4e/bmjiaolv_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7e/bmhuixinxiao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ec/bmhuaixiao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4b/bmhuachi_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/61/bmhoulianpi_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/16/bmhaoba_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6c/bmhaipa_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/15/bmguilian_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e4/bmgudu_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/85/bmgaoxing_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4b/bmgaoguai_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b4/bmganxiao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/34/bmgandong_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/fc/bmfenmen_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b6/bmfandui_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/54/bmduobu_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/34/bmding_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7a/bmdeyi_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7d/bmdese_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/37/bmdaxiao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f8/bmdangao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/dc/bmdaku_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/83/bmdajiao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b0/bmchijing_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d9/bmchan_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/7e/bmcaise_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/15/bmbinfen_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b7/bmbianshen_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/77/bmbeicui_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/12/bmbaonu_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a4/bmaoye_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/bc/bmanshuang_thumb.gif"]},
        {name : "罗小黑" ,faces : ["http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9b/lxhxmiao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5e/lxhxmiao2_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/c5/lxhxbenpao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/51/lxhxzou_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/93/lxhxruguo_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/27/lxhxceng_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d5/lxhxkuanghuan_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6c/lxhxfendou_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3b/lxhxxiao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/d4/lxhxlanyao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b0/lxhxdeyi_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a4/lxhxyou_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/71/lxhxzhuantou_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ee/lxhxtiaoyue_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/11/lxhxzhuanti_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b8/lxhxsahuan_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/89/lxhxnao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/b8/lxhxnaohuang_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/52/lxhxdouzhuanquan_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/28/lxhxhua_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/80/lxhxdese_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5c/lxhxpenti2_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/15/lxhxpenti_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6a/lxhxku_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/37/lxhxsaohui_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3d/lxhxtingge_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/05/lxhxkuangchi_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f0/lxhxhuaquan_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/18/lxhxxianzhuo_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ce/lxhxshuaya_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/31/lxhxbaozhen_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/03/lxhxdoubugei_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/99/lxhxdouzuoyou_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/14/lxhxbianhua_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/aa/lxhxdadishu_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/45/lxhxxigua_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/01/lxhxxiu1_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a5/lxhxxiu2_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/02/lxhxxiu3_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/75/lxhxxiu4_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/14/lxhxxiu5_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e3/lxhxxiu6_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ec/lxhxxiu7_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/2b/lxhxxiu8_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/43/lxhxgunguo_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f9/lxhxtangzhongqiang_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/98/lxhxtaoyan_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/51/lxhxdoushangxia_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/03/lxhxtuxue_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/9f/lxhxbingle_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ee/lxhxleimu_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/2e/lxhxwuyu_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/fa/lxhxwenhao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8c/lxhxcemu_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6a/lxhxjing_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/92/lxhxtu_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/52/lxhxshiluo_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4f/lxhxhan_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/03/lxhxhan1_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/8c/lxhxhen_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/a6/lxhxyuannian_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/82/lxhxshuijiao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/21/lxhxqiubiaoyang_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4a/lxhxzhuodi_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/71/lxhxwuliao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/e0/lxhxshunmao_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/ab/lxhxhenai_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/f2/lxhxbushuang_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/89/lxhxlaoda_thumb.gif","http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/5b/longnianmtjj_thumb.gif"]},
        {name : "洋葱头" ,faces : ["http://img1.guokr.com/image/-QHcaozESmILkhIb3WRkuYBlFUWqp38xW12VidD_VWKQAAAAcgAAAEdJ.gif",
"http://img1.guokr.com/image/Cnx_5RwraRRPIM9YZJtVuUxFd7bftxBTR7-Wv0L2WVEyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/uXv-UartSjmWicXETHZiaVyTZw5otYKsL_1_Ttg-66AyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/7Qw727wtIdlpZ_yMUmPaFTOjAnPdKacSeoXGwxj2WU0yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/ILe-4BxPfrbJ3xEX5v9YLpURerx-85ZXlXv4l8qMMWIyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/vM86AoFlqWaXMY74-KwTb9EIUrm3J3_aaRWLyAdzgrgyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/c7ICiduqWNg4DIuWwnyj6i7xBLjQRmBY0_87dPwpMzMyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/2bO0KmDbjfUNmGroCSj3XE5yeefawXw7174QcWyIUVIyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/Yr9mAT5xxAQrEIC0DcQfenJYImGfE6bIinACpVh-mOcyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/UR4QhpKWqNgzhhXdejwwkXpYP4vE5zPuJgd5u7z9cyQyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/afcRgsmePVMHBpmcCPtoP_ApAEvW7WvcyxbjWHK4SwYyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/oxZZisJRRhqxKFHV5tU3N5H5TVibMStC9LktfO7w9YsyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/XJWHLT7Ohubf3OkbWNgAj7CVTLg1T6m8s6uq1STfqOYyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/Quj_pYxyq8T_lUn4VWtiDxM8m50NmSA5CbYbtV8cQP0yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/ZGq_n8s-W_KzMWMtIEZwE-goKsPNxEsEdrPJonCg3zcyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/GrzucPMLlN7UE_ZuIZ4QhIHSUcof-PBbzNHUuvCszeUyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/aV6ENGLeZUyvFp0nKfbq_V_ErCmWnjwtQ8zdMBpTaEAyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/c9e7VIVyjR4cNaaoD2iS3UteAioWoy3mwhDKcVzPcMMyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/jP0dYGWfq25JDZD2RiJoQqCYwkA7C5wDoTDRwZKkkvgyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/T68mv6CTO8YVQkNgbnluOi89DezcAo8Q2V1b-UCJgQkyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/GqY9VAr1m5Qk3Ayu1uasK0mkRQgcbFw_B1WsM0ShOCUyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/imLNJQ5F9Al2A_5dwSaizTdnNV1MNeJCYJGEMEVzoekyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/uYwQtNjSVnVu1EhGnQKy51FfNVEcgkFUIwFNpmejakcyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/18yaHTD7zv03aX1clDSXY6D-ie6cCgMzfAArSBNhu5oyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/iDlx2cnjJ7SDg3y-C4AEtEKjO7E0LVcwUMnfNNnSeRsyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/acALmB5FyLvQsacSdVfVrJyxNVWYjuhD2F0U0Z_6T7oyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/p2xwFsm0JEXnQr6o0KR93wluGMLXUus4Qo20GiW86OAyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/RGM3fHKDnv-Kia1R4RcJadK1WgwztEH_-RwUQoaKQAgyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/RA4Wj_ERBV5-OkMpVf5kmAgaGclDzcUVl6Dmk4TodSkyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/9Q4mHt9xzIiVJrE-x82U-jXTNvO65cDSFG5EI15oCIYyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/Q_hbLdS8lxOHd2ZlLq1unQg3_0ptPjKkAbAk5ZDz3PcyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/9_m1TS0B0-boFMN3--tdRpOGbgI6y8bs3NNFUUKoBj8yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/oFGaFdakCDWem9MhoW9_rjfmiG0XbVNQUCvyBMR38rgyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/59F02wHp01y9l0qvo1607hDYrXn5tM6Qw6gaFqAuaGIyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/yhBhtbuactRO9qbHFlCGzaFckaSRWNmRpv1NQnQdufsyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/cY_Ofinx9GFYrENxHC_k3ttuYdlhrzUdXIHvQ_ydfAMyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/sh7RhMT7VIMiqy5QZmaWwigMc6wXXkuuM0jR-0cEMYYyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/UHEPrIkE14MU9FinlPrEt773YXCHRY04daKp_EI5_MgyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/WLzMVdv8v0UGTxfWtVvpdfq7C0XwdUk0j8WDaLDro54yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/bi-ScOeqteBUtNu2qM9DZbtbKRAe8jrIEw2fuoA2l6syAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/AZ5ossIxX69XBU2Q_2ZFri4FzY_6xRWujsyKpsLJ83YyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/48ethJzxZD2LNZmTtfcDHIWV_EiMCiUFQlDpXYHnUGAyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/opj9tCdCJ4Bh6kHq9e1a-2I2tfo7Ouj6pCVValUVWBIyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/l8dqpLQAI7Q_icVunB2sstwwQE9tM1S34or1mEEEpm8yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/VB0ngpVjbi3LcPOSmjPffdk4P82DQ4AUB9kRX1qkBB8yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/b0JoK5ob88NedP1qZ6UcKlon6vdVvo5sUcrt4ftinr4yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/3z8NALsOqoNd3mYz8wypcfzRpJvn6AL03LD4i_p_n8AyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/D_FY_DgkbaKid-IIu2RjQ8zmXjMchX29wQ5l_HNsuqEyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/zKs2fSfZAyPwJVlQiuucn4XxS1pJfAas9uwf6Jn3ouIyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/JPTNlnIHBG4FXxJqhZpbQkiSjlvRQv24xQtbxDIe53AyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/T3FafMAtaKijKJ8gD0nTrMwK65mjvv6XXrLTnKPNIw0yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/iFjQyAssLycnZGKoYkC752By5BfX_AYhX-pw5Q8lN_kyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/bHfuLWyKXMs7RP4Loc2hKi6l844goFWdWYoqRS3JahcyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/xU5ly8MjV2EEYtdVuoUXgJmAhx3mGkG1RpDjag_YI_QyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/lh8sb9X4rez3gVm_kPGmbYKvdo1nCWRlMylc6vQT574yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/UEBnGpkn75MH83m2X4r51gR3USpgkAtGJoyQPMdcvyYyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/_mOJCNC0KeeFGw8IxqNC1FqFq7flFPFdXajfNa8DO-gyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/wP_frttMNGUjtvmhdcGWXHJTrp1WTn9F6GuKGuEwI6IyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/jDAMGq1hS4uwQ4fSAjk3HOmQMfiCxVxdLrGiNkqrAyEyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/ne9J-UYSWtr4qLiyDsmoKXx0wEMBP5kJtCN-C0FRH3wyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/NgfaKehLvShrgIhMNHeFUUQvj4qT5IGYNQoa4y_oH_MyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/9Ef25t5kR02sjjPCN5MOoGGzhIAuljuvwcg2SJXy3lsyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/NEuqOrKxhe_TmVMkzV1_PEW3DL0xAi3u4SYFK4beM6syAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/UuAm5mINAiz3hmWMp0jm9DQ_N6F8TrWhgz2OG2oCXO0yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/N4nnH4hOhBRtihKvGl-cih2eTNXL8iHhGq8o7-5k4vkyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/vfd8eAXVpS1svkcyqqju6w816Eq9MaXBPPr08ethbAYyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/N7tQT8iXEBL5frYDA6sdEO_JhYUFfmQft-m1a748SnIyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/Et2zGnyTtOLzGOCmPXoSvLldodIBmhKk9lwhxDuOqGYyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/VSAezhCcbOylGupUr_uIRJoWhYzup7RuQI60wPnOyPQyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/Mcvx_GbW_EQP8LzijEleKWFfaJuA7XrTFzdL3smNk9AyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/aue4GotxalO6d2vGPnH4OA7WVgCGUE8AAVHGtB-jQWYyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/4LsIpth0jDMEqAvnIKTdhB5dLMFWxLiqpbmTPz8ch6EyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/0ZuUSPaVywUzjaL5tc3_ep-iGutzKq7Kfi4uW0AFM_4yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/4SNovQ9fZx-Uch_6t0wnO1O2rWlvCI9CldmloHJOdEYyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/1NYJbPTfjkuJfMwBLKA9ScgG3Va23wo-pcqKiulGU8kyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/Mzh3JMEZicQ3VLGQ26RcV4YMy740n0Ce6uO5tuR9MfUyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/_hkjRcMYP2jylV-uIOVr-iV6jY3YGcEwfbgOiJ5779MyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/rLpaQ1EPg0LgC-aW9w_6FRVJlhcd4cL0XDzIMHw4MHkyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/qCkGCuYLZgfApFM6ElRsCw8LxW7hv9gjmJ6QNuimgQcyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/cTFamewFK7spvMPTZBvJMWTLHouv0v581uNFChMWt40yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/63QIdCT-vz2JJdx2IQqlyOh1OQ-tM9J5h7PgVNf-H-UyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/1Djc3-s91-NJZnkRehZr_VC5nnYFyjrIFkzbrRUC5wQyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/ihUX_TfTBotQzlZIrX6I0c-0yl-zccTkRhrh5lANuxMyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/s5gENuxCsXPejO2UTQ6BNzR3IqgOgmKRQa-ir3GdeiwyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/YqkOVt6osGPIzLqnSIPxPKLXNov4drHgOPpyk01aCToyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/3DcF6-h6My9lYAsfCFhXR5Cx91ZzKDAmJtTCSYtzILQyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/4gTxdtZ4_lLgqk0kNyaH07d18171HWzC54Jip7o4elUyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/wNcWJLE0iCQ9dp1GLzxlM_5xT3Qx7HYYrXl39pzc_IAyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/46tK2LMZVqR1FHoQj4jeOnEazWfMwLI_ezqUnqAsG1YyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/OrnzkVWQ4nKp4N5eBdBORIpCZCVGMcTmPOWHhDI-UYoyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/lM5AN8TgId8Wi96bvAkDRa8t4HQvHRMpjxuT-KbgkAcyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/P0nkEWtaUsgVcGU-EctwIRTUOVrtQNxz9xF19gDiKIwyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/Fwi6O3H4pkFCPCvdV_UXmnixXRNwKGq2w4TkZQvckSoyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/3eqeGr-AwJBHov1EXHHaqmXYnl8nH7-7qbqVvu75cp4yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/av0ake_MVtxx47K1VRk-Bxr3EpAjroAHsQ_AyC4CCp4yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/GDuouf7rKXdneomr9ANbN-aH9w8UDL5GQkBkUmJ4nDAyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/PlDTrxZ1ARysGrqtXK_RZ0iAYGsFCUsaWZkabujTZJ8yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/9DloRomC6Zre7iBxSwLExx0FSAJvf3BgZB5GkHsIqKsyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/0Kt5NTpsGeaJiNaJKZlIwZrIaxBNh566gg6BK0QLuWkyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/Yq5ciSY54KGeAI10mQIdj7ywEVkYn-wZ0CuOPDIj4eoyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/7EHCvyQEugWZmItvqmTrq7xkUA017Ocg0trY6jlUBM4yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/0TJKbTeHAMa4xQ9MwP39d0oju8GqnTJQV6ijyn6xmn0yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/re35_VZ3c1oGBboFY-WhbyRopC5KVGPvJQv8Q6pdyaIyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/P__3UgzlCCyrk49G1HD11pcuUrThtzgwHpPgJ4T391MyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/BSoE111_bxW7bJEnetaw6ZcAvUFnY2muueQf2l7HG-4yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/Z65VRUeg9hdQcIB3xwiPFMpcCMioaVybLMhYw1YuWK4yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/iz82RlyVXPALv5xWcKrXskI67yKGC2DGX3cLBa-7U9oyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/iEbxtGvLtM2YSQAxZGITY_gnaOeBiHMWHdVmmcRDOyEyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/zorxzDkcBHajoiDmUCBeSZYprllwM_Ffuw3QlWj24YoyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/P_2uwKV5vcAjeATxlYfnde94mouJ6a0CDu9Y9TIRI_cyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/5GQ1YfGdAFBgtHtMtA1Nyr_lsySZf2M_VFCnYyaGBWwyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/ijUpCJore1QTrVNnUGYSLZ6UsH_EReilMo0cmucgicgyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/n5gBVJ8BnkM4ikvsd4AEh6O3_ZgfvruCpoIVoy1UXWEyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/zxyUrVzJftCtVAdRBR6nHiG68KxMPFXPX3TiD8AXzs4yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/rzUF2OSsF9vRPnrd0QLn_LZkMZWfomoTtHGV2snKGx8yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/Dp6TiyHKRnI-D1aJhTNWWDliBi7BxpMAmeljBlTKOZgyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/0a__-CMarqc_arOdLL0JbMBUaHTOEuxwMyAKaqjZc8UyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/XXBjWgR1Ca_hXFBZDJ7HLs-9W9Zl3zpKhVa5Je5sSvgyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/Q3MTfMx_Dlvy788_0pfpKLVTxD1FP1lFWWAY0MxKlDcyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/LeigcgxbL3M2q6pX2qi9KBZIjP0SfuUsgL9pk5pDXf8yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/RLq7LqKiR5JY7NSAlA9J-ebyOzlD5BXaB0R-5PN1z_gyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/OGyvTEoEz9OdrNnThrHsvby8Z2Bq9NpsOY78shLwEMsyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/ZzT1jLCe2bV39OPx485pmSO7DeepE3yqki9X6oqC6o0yAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/tjqPNwLm7on0TEA9IMS-9AdDUFqGBzcYCM37ORnIXaUyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/KYySijO5pDAK2wg-iqTvBjcUqoFdA3go0MZMZjfKzPcyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/InaFK6VdhowHJ8Sg4sheR66g-Y21ylUDb6diIFJrBnEyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/YQLnA3N98caKHrsZ2Pu1fkGZCIeIqpfVzht4JEfEFbpAAQAAUAAAAEdJ.gif",
"http://img1.guokr.com/image/sD2vefMBfAUDxeM06Xb177K8j-CPvMoLfS2QCVS5_8AyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/yTkfrLFQJjLTife9AoNzQFvqtMnU8SQ2K46XeYrBx4syAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/B9AHrhQlqFUTBxiIiFPnmk4ZsW0Hh56okesFOhOHtDIyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/SwFT2iMR1AOxvBuY2Z7s4UxH9A8jCNloEVOQkMngULwyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/E5-BQBHoLRu3X8RM9t12l4RRSQSb2GM2fPau9WMal_AyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/TzmfnJJgd6-O-z5hmvdojo-9aH7rr-tpsD1DzZj7NGcyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/ppDGgnB2vz6n3S8kRz2ZeTr0aRxzBx7j7BIMY4ayx4cyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/sYnJpkWw8mtqmrvd8WQPRuSabD3og-cF4bBmMPof2GkyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/-CPh2NsucDME-hjA9B9PrvwPPDRIQMzKUS09WwcWe2cyAAAAMgAAAEdJ.gif",
"http://img1.guokr.com/image/aQ0mPWZp1TpYjuUlSfmPJ5zKMW_4ISZ6Meaabohj5dcyAAAAMgAAAEdJ.gif"]},
        {name : "百度", faces : ["http://static.tieba.baidu.com/tb/editor/images/tsj/t_0015.gif","http://static.tieba.baidu.com/tb/editor/images/tsj/t_0017.gif","http://static.tieba.baidu.com/tb/editor/images/tsj/t_0021.gif","http://static.tieba.baidu.com/tb/editor/images/tsj/t_0022.gif","http://static.tieba.baidu.com/tb/editor/images/tsj/t_0024.gif","http://static.tieba.baidu.com/tb/editor/images/tsj/t_0025.gif","http://static.tieba.baidu.com/tb/editor/images/tsj/t_0028.gif","http://static.tieba.baidu.com/tb/editor/images/tsj/t_0030.gif","http://static.tieba.baidu.com/tb/editor/images/tsj/t_0035.gif","http://static.tieba.baidu.com/tb/editor/images/bobo/B_0005.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0026.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0025.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0024.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0023.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0022.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0021.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0020.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0019.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0018.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0013.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0012.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0011.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0010.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0009.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0008.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0007.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0006.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0005.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0004.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0003.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0002.gif","http://static.tieba.baidu.com/tb/editor/images/jd/j_0001.gif"]},
        {name : "我的收藏", faces : []}
    ];
    //备份原始的我的收藏,请勿修改
    var favFaces=[];

    //个人设置URL
    var setHref = "http://www.guokr.com/settings/profile/";
    
    //页面url
    var pageurl = window.location.href.replace(/(\?|#).*$/,"");
    var isMainpage = (pageurl == "http://www.guokr.com/");
    //一些处理标识(不要改动)
    var hoverTimer, outTimer, hideFaceTimer, showFaceTimer, showPreviewTimer, showGroupTimer;
    var selfHomepage;
    var willRun = false;
    var colors = ["ffffff","ffccc9","ffce93","fffc9e","ffffc7","9aff99","96fffb","cdffff","cbcefb","cfcfcf","fd6864","fe996b","fffe65","fcff2f","67fd9a","38fff8","68fdff","9698ed","c0c0c0","fe0000","f8a102","ffcc67","f8ff00","34ff34","68cbd0","34cdf9","6665cd","9b9b9b","cb0000","f56b00","ffcb2f","ffc702","32cb00","00d2cb","3166ff","6434fc","656565","9a0000","ce6301","cd9934","999903","009901","329a9d","3531ff","6200c9","343434","680100","963400","986536","646809","036400","34696d","00009b","303498","000000","330001","643403","663234","343300","013300","003532","010066","340096"];
    
    
    //jQuery1.3.2
    if(!(window.$)){//兼容Opera浏览器的普通模式和GM模式
        (function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
        (function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();
    }


    //消息发送
    function sendMsg(title,msg,callback){
        var o = new Object();
        o[title]=msg;
        chrome.runtime.sendMessage(o,callback);
    }

    //消息处理
    var handler = {
        storageUpdate : function(data) {
            log("storageUpdating");
            log(data);
            for(var key in data){
                localStorage.setItem(key,data[key]);
                if(key == "gkr-user-favfaces"){
                    reloadFace();
                }
            }
        }
    }

    //消息接收
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        for(var title in request){
          handler[title](request[title], sender, sendResponse);
        }
      }
    );
        
    //备份
    $.each(defaultMoreFaces[defaultMoreFaces.length-1].faces,
        function(i,n){
            favFaces.push(n);
    });

    //需要从background载入的数据
    sendMsg("getItemArray", ["gkr-user-favfaces"], function(data){
        for(var key in data){
            localStorage.setItem(key,data[key]);
        }
    });
    
    //获取拼音
    var Pinyin={} 
    Pinyin._pinyin={"a":"\u554a\u963f\u9515","ai":"\u57c3\u6328\u54ce\u5509\u54c0\u7691\u764c\u853c\u77ee\u827e\u788d\u7231\u9698\u8bf6\u6371\u55f3\u55cc\u5ad2\u7477\u66a7\u7839\u953f\u972d","an":"\u978d\u6c28\u5b89\u4ffa\u6309\u6697\u5cb8\u80fa\u6848\u8c19\u57ef\u63de\u72b4\u5eb5\u6849\u94f5\u9e4c\u9878\u9eef","ang":"\u80ae\u6602\u76ce","ao":"\u51f9\u6556\u71ac\u7ff1\u8884\u50b2\u5965\u61ca\u6fb3\u5773\u62d7\u55f7\u5662\u5c99\u5ed2\u9068\u5aaa\u9a9c\u8071\u87af\u93ca\u9ccc\u93d6","ba":"\u82ad\u634c\u6252\u53ed\u5427\u7b06\u516b\u75a4\u5df4\u62d4\u8dcb\u9776\u628a\u8019\u575d\u9738\u7f62\u7238\u8307\u83dd\u8406\u636d\u5c9c\u705e\u6777\u94af\u7c91\u9c85\u9b43","bai":"\u767d\u67cf\u767e\u6446\u4f70\u8d25\u62dc\u7a17\u859c\u63b0\u97b4","ban":"\u6591\u73ed\u642c\u6273\u822c\u9881\u677f\u7248\u626e\u62cc\u4f34\u74e3\u534a\u529e\u7eca\u962a\u5742\u8c73\u94a3\u7622\u764d\u8228","bang":"\u90a6\u5e2e\u6886\u699c\u8180\u7ed1\u68d2\u78c5\u868c\u9551\u508d\u8c24\u84a1\u8783","bao":"\u82de\u80de\u5305\u8912\u96f9\u4fdd\u5821\u9971\u5b9d\u62b1\u62a5\u66b4\u8c79\u9c8d\u7206\u52f9\u8446\u5b80\u5b62\u7172\u9e28\u8913\u8db5\u9f85","bo":"\u5265\u8584\u73bb\u83e0\u64ad\u62e8\u94b5\u6ce2\u535a\u52c3\u640f\u94c2\u7b94\u4f2f\u5e1b\u8236\u8116\u818a\u6e24\u6cca\u9a73\u4eb3\u8543\u5575\u997d\u6a97\u64d8\u7934\u94b9\u9e41\u7c38\u8ddb","bei":"\u676f\u7891\u60b2\u5351\u5317\u8f88\u80cc\u8d1d\u94a1\u500d\u72c8\u5907\u60eb\u7119\u88ab\u5b5b\u9642\u90b6\u57e4\u84d3\u5457\u602b\u6096\u789a\u9e4e\u8919\u943e","ben":"\u5954\u82ef\u672c\u7b28\u755a\u574c\u951b","beng":"\u5d29\u7ef7\u752d\u6cf5\u8e66\u8ff8\u552a\u5623\u750f","bi":"\u903c\u9f3b\u6bd4\u9119\u7b14\u5f7c\u78a7\u84d6\u853d\u6bd5\u6bd9\u6bd6\u5e01\u5e87\u75f9\u95ed\u655d\u5f0a\u5fc5\u8f9f\u58c1\u81c2\u907f\u965b\u5315\u4ef3\u4ffe\u8298\u835c\u8378\u5421\u54d4\u72f4\u5eb3\u610e\u6ed7\u6fde\u5f3c\u59a3\u5a62\u5b16\u74a7\u8d32\u7540\u94cb\u79d5\u88e8\u7b5a\u7b85\u7be6\u822d\u895e\u8df8\u9ac0","bian":"\u97ad\u8fb9\u7f16\u8d2c\u6241\u4fbf\u53d8\u535e\u8fa8\u8fa9\u8fab\u904d\u533e\u5f01\u82c4\u5fed\u6c74\u7f0f\u7178\u782d\u78a5\u7a39\u7a86\u8759\u7b3e\u9cca","biao":"\u6807\u5f6a\u8198\u8868\u5a4a\u9aa0\u98d1\u98d9\u98da\u706c\u9556\u9573\u762d\u88f1\u9cd4","bie":"\u9cd6\u618b\u522b\u762a\u8e69\u9cd8","bin":"\u5f6c\u658c\u6fd2\u6ee8\u5bbe\u6448\u50a7\u6d5c\u7f24\u73a2\u6ba1\u8191\u9554\u9acc\u9b13","bing":"\u5175\u51b0\u67c4\u4e19\u79c9\u997c\u70b3\u75c5\u5e76\u7980\u90b4\u6452\u7ee0\u678b\u69df\u71f9","bu":"\u6355\u535c\u54fa\u8865\u57e0\u4e0d\u5e03\u6b65\u7c3f\u90e8\u6016\u62ca\u535f\u900b\u74ff\u6661\u949a\u91ad","ca":"\u64e6\u5693\u7924","cai":"\u731c\u88c1\u6750\u624d\u8d22\u776c\u8e29\u91c7\u5f69\u83dc\u8521","can":"\u9910\u53c2\u8695\u6b8b\u60ed\u60e8\u707f\u9a96\u74a8\u7cb2\u9eea","cang":"\u82cd\u8231\u4ed3\u6ca7\u85cf\u4f27","cao":"\u64cd\u7cd9\u69fd\u66f9\u8349\u8279\u5608\u6f15\u87ac\u825a","ce":"\u5395\u7b56\u4fa7\u518c\u6d4b\u5202\u5e3b\u607b","ceng":"\u5c42\u8e6d\u564c","cha":"\u63d2\u53c9\u832c\u8336\u67e5\u78b4\u643d\u5bdf\u5c94\u5dee\u8be7\u7339\u9987\u6c4a\u59f9\u6748\u6942\u69ce\u6aab\u9497\u9538\u9572\u8869","chai":"\u62c6\u67f4\u8c7a\u4faa\u8308\u7625\u867f\u9f87","chan":"\u6400\u63ba\u8749\u998b\u8c17\u7f20\u94f2\u4ea7\u9610\u98a4\u5181\u8c04\u8c36\u8487\u5edb\u5fcf\u6f7a\u6fb6\u5b71\u7fbc\u5a75\u5b17\u9aa3\u89c7\u7985\u9561\u88e3\u87fe\u8e94","chang":"\u660c\u7316\u573a\u5c1d\u5e38\u957f\u507f\u80a0\u5382\u655e\u7545\u5531\u5021\u4f25\u9b2f\u82cc\u83d6\u5f9c\u6005\u60dd\u960a\u5a3c\u5ae6\u6636\u6c05\u9cb3","chao":"\u8d85\u6284\u949e\u671d\u5632\u6f6e\u5de2\u5435\u7092\u600a\u7ec9\u6641\u8016","che":"\u8f66\u626f\u64a4\u63a3\u5f7b\u6f88\u577c\u5c6e\u7817","chen":"\u90f4\u81e3\u8fb0\u5c18\u6668\u5ff1\u6c89\u9648\u8d81\u886c\u79f0\u8c0c\u62bb\u55d4\u5bb8\u741b\u6987\u809c\u80c2\u789c\u9f80","cheng":"\u6491\u57ce\u6a59\u6210\u5448\u4e58\u7a0b\u60e9\u6f84\u8bda\u627f\u901e\u9a8b\u79e4\u57d5\u5d4a\u5fb5\u6d48\u67a8\u67fd\u6a18\u665f\u584d\u77a0\u94d6\u88ce\u86cf\u9172","chi":"\u5403\u75f4\u6301\u5319\u6c60\u8fdf\u5f1b\u9a70\u803b\u9f7f\u4f88\u5c3a\u8d64\u7fc5\u65a5\u70bd\u50ba\u5880\u82aa\u830c\u640b\u53f1\u54e7\u557b\u55e4\u5f73\u996c\u6cb2\u5ab8\u6555\u80dd\u7719\u7735\u9e31\u761b\u892b\u86a9\u87ad\u7b1e\u7bea\u8c49\u8e05\u8e1f\u9b51","chong":"\u5145\u51b2\u866b\u5d07\u5ba0\u833a\u5fe1\u61a7\u94f3\u825f","chou":"\u62bd\u916c\u7574\u8e0c\u7a20\u6101\u7b79\u4ec7\u7ef8\u7785\u4e11\u4fe6\u5733\u5e31\u60c6\u6eb4\u59af\u7633\u96e0\u9c8b","chu":"\u81ed\u521d\u51fa\u6a71\u53a8\u8e87\u9504\u96cf\u6ec1\u9664\u695a\u7840\u50a8\u77d7\u6410\u89e6\u5904\u4e8d\u520d\u61b7\u7ecc\u6775\u696e\u6a17\u870d\u8e70\u9edc","chuan":"\u63e3\u5ddd\u7a7f\u693d\u4f20\u8239\u5598\u4e32\u63be\u821b\u60f4\u9044\u5ddb\u6c1a\u948f\u9569\u8221","chuang":"\u75ae\u7a97\u5e62\u5e8a\u95ef\u521b\u6006","chui":"\u5439\u708a\u6376\u9524\u5782\u9672\u68f0\u69cc","chun":"\u6625\u693f\u9187\u5507\u6df3\u7eaf\u8822\u4fc3\u83bc\u6c8c\u80ab\u6710\u9e51\u877d","chuo":"\u6233\u7ef0\u851f\u8fb6\u8f8d\u955e\u8e14\u9f8a","ci":"\u75b5\u8328\u78c1\u96cc\u8f9e\u6148\u74f7\u8bcd\u6b64\u523a\u8d50\u6b21\u8360\u5472\u5d6f\u9e5a\u8785\u7ccd\u8d91","cong":"\u806a\u8471\u56f1\u5306\u4ece\u4e1b\u506c\u82c1\u6dd9\u9aa2\u742e\u7481\u679e","cu":"\u51d1\u7c97\u918b\u7c07\u731d\u6b82\u8e59","cuan":"\u8e7f\u7be1\u7a9c\u6c46\u64ba\u6615\u7228","cui":"\u6467\u5d14\u50ac\u8106\u7601\u7cb9\u6dec\u7fe0\u8403\u60b4\u7480\u69b1\u96b9","cun":"\u6751\u5b58\u5bf8\u78cb\u5fd6\u76b4","cuo":"\u64ae\u6413\u63aa\u632b\u9519\u539d\u811e\u9509\u77ec\u75e4\u9e7e\u8e49\u8e9c","da":"\u642d\u8fbe\u7b54\u7629\u6253\u5927\u8037\u54d2\u55d2\u601b\u59b2\u75b8\u8921\u7b2a\u977c\u9791","dai":"\u5446\u6b79\u50a3\u6234\u5e26\u6b86\u4ee3\u8d37\u888b\u5f85\u902e\u6020\u57ed\u7519\u5454\u5cb1\u8fe8\u902f\u9a80\u7ed0\u73b3\u9edb","dan":"\u803d\u62c5\u4e39\u5355\u90f8\u63b8\u80c6\u65e6\u6c2e\u4f46\u60ee\u6de1\u8bde\u5f39\u86cb\u4ebb\u510b\u5369\u840f\u5556\u6fb9\u6a90\u6b9a\u8d55\u7708\u7605\u8043\u7baa","dang":"\u5f53\u6321\u515a\u8361\u6863\u8c20\u51fc\u83ea\u5b95\u7800\u94db\u88c6","dao":"\u5200\u6363\u8e48\u5012\u5c9b\u7977\u5bfc\u5230\u7a3b\u60bc\u9053\u76d7\u53e8\u5541\u5fc9\u6d2e\u6c18\u7118\u5fd1\u7e9b","de":"\u5fb7\u5f97\u7684\u951d","deng":"\u8e6c\u706f\u767b\u7b49\u77aa\u51f3\u9093\u5654\u5d9d\u6225\u78f4\u956b\u7c26","di":"\u5824\u4f4e\u6ef4\u8fea\u654c\u7b1b\u72c4\u6da4\u7fdf\u5ae1\u62b5\u5e95\u5730\u8482\u7b2c\u5e1d\u5f1f\u9012\u7f14\u6c10\u7c74\u8bcb\u8c1b\u90b8\u577b\u839c\u837b\u5600\u5a23\u67e2\u68e3\u89cc\u7825\u78b2\u7747\u955d\u7f9d\u9ab6","dian":"\u98a0\u6382\u6ec7\u7898\u70b9\u5178\u975b\u57ab\u7535\u4f43\u7538\u5e97\u60e6\u5960\u6dc0\u6bbf\u4e36\u963d\u576b\u57dd\u5dc5\u73b7\u765c\u766b\u7c1f\u8e2e","diao":"\u7889\u53fc\u96d5\u51cb\u5201\u6389\u540a\u9493\u8c03\u8f7a\u94de\u8729\u7c9c\u8c82","die":"\u8dcc\u7239\u789f\u8776\u8fed\u8c0d\u53e0\u4f5a\u57a4\u581e\u63f2\u558b\u6e2b\u8f76\u7252\u74de\u8936\u800b\u8e40\u9cbd\u9cce","ding":"\u4e01\u76ef\u53ee\u9489\u9876\u9f0e\u952d\u5b9a\u8ba2\u4e22\u4ec3\u5576\u738e\u815a\u7887\u753a\u94e4\u7594\u8035\u914a","dong":"\u4e1c\u51ac\u8463\u61c2\u52a8\u680b\u4f97\u606b\u51bb\u6d1e\u578c\u549a\u5cbd\u5cd2\u5902\u6c21\u80e8\u80f4\u7850\u9e2b","dou":"\u515c\u6296\u6597\u9661\u8c46\u9017\u75d8\u8538\u94ad\u7aa6\u7aac\u86aa\u7bfc\u9161","du":"\u90fd\u7763\u6bd2\u728a\u72ec\u8bfb\u5835\u7779\u8d4c\u675c\u9540\u809a\u5ea6\u6e21\u5992\u828f\u561f\u6e0e\u691f\u6a50\u724d\u8839\u7b03\u9ad1\u9ee9","duan":"\u7aef\u77ed\u953b\u6bb5\u65ad\u7f0e\u5f56\u6934\u7145\u7c16","dui":"\u5806\u5151\u961f\u5bf9\u603c\u619d\u7893","dun":"\u58a9\u5428\u8e72\u6566\u987f\u56e4\u949d\u76fe\u9041\u7096\u7818\u7905\u76f9\u9566\u8db8","duo":"\u6387\u54c6\u591a\u593a\u579b\u8eb2\u6735\u8dfa\u8235\u5241\u60f0\u5815\u5484\u54da\u7f0d\u67c1\u94ce\u88f0\u8e31","e":"\u86fe\u5ce8\u9e45\u4fc4\u989d\u8bb9\u5a25\u6076\u5384\u627c\u904f\u9102\u997f\u5669\u8c14\u57a9\u57ad\u82ca\u83aa\u843c\u5443\u6115\u5c59\u5a40\u8f6d\u66f7\u816d\u786a\u9507\u9537\u9e57\u989a\u9cc4","en":"\u6069\u84bd\u6441\u5514\u55ef","er":"\u800c\u513f\u8033\u5c14\u9975\u6d31\u4e8c\u8d30\u8fe9\u73e5\u94d2\u9e38\u9c95","fa":"\u53d1\u7f5a\u7b4f\u4f10\u4e4f\u9600\u6cd5\u73d0\u57a1\u781d","fan":"\u85e9\u5e06\u756a\u7ffb\u6a0a\u77fe\u9492\u7e41\u51e1\u70e6\u53cd\u8fd4\u8303\u8d29\u72af\u996d\u6cdb\u8629\u5e61\u72ad\u68b5\u6535\u71d4\u7548\u8e6f","fang":"\u574a\u82b3\u65b9\u80aa\u623f\u9632\u59a8\u4eff\u8bbf\u7eba\u653e\u531a\u90a1\u5f77\u94ab\u822b\u9c82","fei":"\u83f2\u975e\u5561\u98de\u80a5\u532a\u8bfd\u5420\u80ba\u5e9f\u6cb8\u8d39\u82be\u72d2\u60b1\u6ddd\u5983\u7ecb\u7eef\u69a7\u8153\u6590\u6249\u7953\u7829\u9544\u75f1\u871a\u7bda\u7fe1\u970f\u9cb1","fen":"\u82ac\u915a\u5429\u6c1b\u5206\u7eb7\u575f\u711a\u6c7e\u7c89\u594b\u4efd\u5fff\u6124\u7caa\u507e\u7035\u68fc\u610d\u9cbc\u9f22","feng":"\u4e30\u5c01\u67ab\u8702\u5cf0\u950b\u98ce\u75af\u70fd\u9022\u51af\u7f1d\u8bbd\u5949\u51e4\u4ff8\u9146\u8451\u6ca3\u781c","fu":"\u4f5b\u5426\u592b\u6577\u80a4\u5b75\u6276\u62c2\u8f90\u5e45\u6c1f\u7b26\u4f0f\u4fd8\u670d\u6d6e\u6daa\u798f\u88b1\u5f17\u752b\u629a\u8f85\u4fef\u91dc\u65a7\u812f\u8151\u5e9c\u8150\u8d74\u526f\u8986\u8d4b\u590d\u5085\u4ed8\u961c\u7236\u8179\u8d1f\u5bcc\u8ba3\u9644\u5987\u7f1a\u5490\u5310\u51eb\u90db\u8299\u82fb\u832f\u83a9\u83d4\u544b\u5e5e\u6ecf\u8274\u5b5a\u9a78\u7ec2\u6874\u8d59\u9efb\u9efc\u7f58\u7a03\u99a5\u864d\u86a8\u8709\u8760\u876e\u9eb8\u8dba\u8dd7\u9cc6","ga":"\u5676\u560e\u86e4\u5c2c\u5477\u5c15\u5c1c\u65ee\u9486","gai":"\u8be5\u6539\u6982\u9499\u76d6\u6e89\u4e10\u9654\u5793\u6224\u8d45\u80f2","gan":"\u5e72\u7518\u6746\u67d1\u7aff\u809d\u8d76\u611f\u79c6\u6562\u8d63\u5769\u82f7\u5c34\u64c0\u6cd4\u6de6\u6f89\u7ec0\u6a44\u65f0\u77f8\u75b3\u9150","gang":"\u5188\u521a\u94a2\u7f38\u809b\u7eb2\u5c97\u6e2f\u6206\u7f61\u9883\u7b7b","gong":"\u6760\u5de5\u653b\u529f\u606d\u9f9a\u4f9b\u8eac\u516c\u5bab\u5f13\u5de9\u6c5e\u62f1\u8d21\u5171\u857b\u5efe\u54a3\u73d9\u80b1\u86a3\u86e9\u89e5","gao":"\u7bd9\u768b\u9ad8\u818f\u7f94\u7cd5\u641e\u9550\u7a3f\u544a\u777e\u8bf0\u90dc\u84bf\u85c1\u7f1f\u69d4\u69c1\u6772\u9506","ge":"\u54e5\u6b4c\u6401\u6208\u9e3d\u80f3\u7599\u5272\u9769\u845b\u683c\u9601\u9694\u94ec\u4e2a\u5404\u9b32\u4ee1\u54ff\u5865\u55dd\u7ea5\u643f\u8188\u784c\u94ea\u9549\u88bc\u988c\u867c\u8238\u9abc\u9ac2","gei":"\u7ed9","gen":"\u6839\u8ddf\u4e98\u831b\u54cf\u826e","geng":"\u8015\u66f4\u5e9a\u7fb9\u57c2\u803f\u6897\u54fd\u8d53\u9ca0","gou":"\u94a9\u52fe\u6c9f\u82df\u72d7\u57a2\u6784\u8d2d\u591f\u4f5d\u8bdf\u5ca3\u9058\u5abe\u7f11\u89cf\u5f40\u9e32\u7b31\u7bdd\u97b2","gu":"\u8f9c\u83c7\u5495\u7b8d\u4f30\u6cbd\u5b64\u59d1\u9f13\u53e4\u86ca\u9aa8\u8c37\u80a1\u6545\u987e\u56fa\u96c7\u560f\u8bc2\u83f0\u54cc\u5d2e\u6c69\u688f\u8f71\u726f\u727f\u80cd\u81cc\u6bc2\u77bd\u7f5f\u94b4\u9522\u74e0\u9e2a\u9e44\u75fc\u86c4\u9164\u89da\u9cb4\u9ab0\u9e58","gua":"\u522e\u74dc\u5250\u5be1\u6302\u8902\u5366\u8bd6\u5471\u681d\u9e39","guai":"\u4e56\u62d0\u602a\u54d9","guan":"\u68fa\u5173\u5b98\u51a0\u89c2\u7ba1\u9986\u7f50\u60ef\u704c\u8d2f\u500c\u839e\u63bc\u6dab\u76e5\u9e73\u9ccf","guang":"\u5149\u5e7f\u901b\u72b7\u6844\u80f1\u7592","gui":"\u7470\u89c4\u572d\u7845\u5f52\u9f9f\u95fa\u8f68\u9b3c\u8be1\u7678\u6842\u67dc\u8dea\u8d35\u523d\u5326\u523f\u5e8b\u5b84\u59ab\u6867\u7085\u6677\u7688\u7c0b\u9c91\u9cdc","gun":"\u8f8a\u6eda\u68cd\u4e28\u886e\u7ef2\u78d9\u9ca7","guo":"\u9505\u90ed\u56fd\u679c\u88f9\u8fc7\u9998\u8803\u57da\u63b4\u5459\u56d7\u5e3c\u5d1e\u7313\u6901\u8662\u951e\u8052\u872e\u873e\u8748","ha":"\u54c8","hai":"\u9ab8\u5b69\u6d77\u6c26\u4ea5\u5bb3\u9a87\u54b4\u55e8\u988f\u91a2","han":"\u9163\u61a8\u90af\u97e9\u542b\u6db5\u5bd2\u51fd\u558a\u7f55\u7ff0\u64bc\u634d\u65f1\u61be\u608d\u710a\u6c57\u6c49\u9097\u83e1\u6496\u961a\u701a\u6657\u7113\u9894\u86b6\u9f3e","hen":"\u592f\u75d5\u5f88\u72e0\u6068","hang":"\u676d\u822a\u6c86\u7ed7\u73e9\u6841","hao":"\u58d5\u568e\u8c6a\u6beb\u90dd\u597d\u8017\u53f7\u6d69\u8585\u55e5\u5686\u6fe0\u704f\u660a\u7693\u98a2\u869d","he":"\u5475\u559d\u8377\u83cf\u6838\u79be\u548c\u4f55\u5408\u76d2\u8c89\u9602\u6cb3\u6db8\u8d6b\u8910\u9e64\u8d3a\u8bc3\u52be\u58d1\u85ff\u55d1\u55ec\u9616\u76cd\u86b5\u7fee","hei":"\u563f\u9ed1","heng":"\u54fc\u4ea8\u6a2a\u8861\u6052\u8a07\u8605","hong":"\u8f70\u54c4\u70d8\u8679\u9e3f\u6d2a\u5b8f\u5f18\u7ea2\u9ec9\u8ba7\u836d\u85a8\u95f3\u6cd3","hou":"\u5589\u4faf\u7334\u543c\u539a\u5019\u540e\u5820\u5f8c\u9005\u760a\u7bcc\u7cc7\u9c8e\u9aba","hu":"\u547c\u4e4e\u5ffd\u745a\u58f6\u846b\u80e1\u8774\u72d0\u7cca\u6e56\u5f27\u864e\u552c\u62a4\u4e92\u6caa\u6237\u51b1\u553f\u56eb\u5cb5\u7322\u6019\u60da\u6d52\u6ef9\u7425\u69f2\u8f77\u89f3\u70c0\u7173\u623d\u6248\u795c\u9e55\u9e71\u7b0f\u9190\u659b","hua":"\u82b1\u54d7\u534e\u733e\u6ed1\u753b\u5212\u5316\u8bdd\u5290\u6d4d\u9a85\u6866\u94e7\u7a1e","huai":"\u69d0\u5f8a\u6000\u6dee\u574f\u8fd8\u8e1d","huan":"\u6b22\u73af\u6853\u7f13\u6362\u60a3\u5524\u75ea\u8c62\u7115\u6da3\u5ba6\u5e7b\u90c7\u5942\u57b8\u64d0\u571c\u6d39\u6d63\u6f36\u5bf0\u902d\u7f33\u953e\u9ca9\u9b1f","huang":"\u8352\u614c\u9ec4\u78fa\u8757\u7c27\u7687\u51f0\u60f6\u714c\u6643\u5e4c\u604d\u8c0e\u968d\u5fa8\u6e5f\u6f62\u9051\u749c\u8093\u7640\u87e5\u7bc1\u9cc7","hui":"\u7070\u6325\u8f89\u5fbd\u6062\u86d4\u56de\u6bc1\u6094\u6167\u5349\u60e0\u6666\u8d3f\u79fd\u4f1a\u70e9\u6c47\u8bb3\u8bf2\u7ed8\u8bd9\u8334\u835f\u8559\u54d5\u5599\u96b3\u6d04\u5f57\u7f0b\u73f2\u6656\u605a\u867a\u87ea\u9ebe","hun":"\u8364\u660f\u5a5a\u9b42\u6d51\u6df7\u8be8\u9984\u960d\u6eb7\u7f17","huo":"\u8c41\u6d3b\u4f19\u706b\u83b7\u6216\u60d1\u970d\u8d27\u7978\u6509\u56af\u5925\u94ac\u952a\u956c\u8020\u8816","ji":"\u51fb\u573e\u57fa\u673a\u7578\u7a3d\u79ef\u7b95\u808c\u9965\u8ff9\u6fc0\u8ba5\u9e21\u59ec\u7ee9\u7f09\u5409\u6781\u68d8\u8f91\u7c4d\u96c6\u53ca\u6025\u75be\u6c72\u5373\u5ac9\u7ea7\u6324\u51e0\u810a\u5df1\u84df\u6280\u5180\u5b63\u4f0e\u796d\u5242\u60b8\u6d4e\u5bc4\u5bc2\u8ba1\u8bb0\u65e2\u5fcc\u9645\u5993\u7ee7\u7eaa\u5c45\u4e0c\u4e69\u525e\u4f76\u4f74\u8114\u58bc\u82a8\u82b0\u8401\u84ba\u857a\u638e\u53fd\u54ad\u54dc\u5527\u5c8c\u5d74\u6d0e\u5f50\u5c50\u9aa5\u757f\u7391\u696b\u6b9b\u621f\u6222\u8d4d\u89ca\u7284\u9f51\u77f6\u7f81\u5d47\u7a37\u7620\u7635\u866e\u7b08\u7b04\u66a8\u8dfb\u8dfd\u9701\u9c9a\u9cab\u9afb\u9e82","jia":"\u5609\u67b7\u5939\u4f73\u5bb6\u52a0\u835a\u988a\u8d3e\u7532\u94be\u5047\u7a3c\u4ef7\u67b6\u9a7e\u5ac1\u4f3d\u90cf\u62ee\u5cac\u6d43\u8fe6\u73c8\u621b\u80db\u605d\u94d7\u9553\u75c2\u86f1\u7b33\u8888\u8dcf","jian":"\u6b7c\u76d1\u575a\u5c16\u7b3a\u95f4\u714e\u517c\u80a9\u8270\u5978\u7f04\u8327\u68c0\u67ec\u78b1\u7877\u62e3\u6361\u7b80\u4fed\u526a\u51cf\u8350\u69db\u9274\u8df5\u8d31\u89c1\u952e\u7bad\u4ef6\u5065\u8230\u5251\u996f\u6e10\u6e85\u6da7\u5efa\u50ed\u8c0f\u8c2b\u83c5\u84b9\u641b\u56dd\u6e54\u8e47\u8b07\u7f23\u67a7\u67d9\u6957\u620b\u622c\u726e\u728d\u6bfd\u8171\u7751\u950f\u9e63\u88e5\u7b15\u7bb4\u7fe6\u8dbc\u8e3a\u9ca3\u97af","jiang":"\u50f5\u59dc\u5c06\u6d46\u6c5f\u7586\u848b\u6868\u5956\u8bb2\u5320\u9171\u964d\u8333\u6d1a\u7edb\u7f30\u729f\u7913\u8029\u7ce8\u8c47","jiao":"\u8549\u6912\u7901\u7126\u80f6\u4ea4\u90ca\u6d47\u9a84\u5a07\u56bc\u6405\u94f0\u77eb\u4fa5\u811a\u72e1\u89d2\u997a\u7f34\u7ede\u527f\u6559\u9175\u8f7f\u8f83\u53eb\u4f7c\u50ec\u832d\u6322\u564d\u5ce4\u5fbc\u59e3\u7e9f\u656b\u768e\u9e6a\u86df\u91ae\u8de4\u9c9b","jie":"\u7a96\u63ed\u63a5\u7686\u79f8\u8857\u9636\u622a\u52ab\u8282\u6854\u6770\u6377\u776b\u7aed\u6d01\u7ed3\u89e3\u59d0\u6212\u85c9\u82a5\u754c\u501f\u4ecb\u75a5\u8beb\u5c4a\u5048\u8ba6\u8bd8\u5588\u55df\u736c\u5a55\u5b51\u6840\u7352\u78a3\u9534\u7596\u88b7\u9889\u86a7\u7faf\u9c92\u9ab1\u9aeb","jin":"\u5dfe\u7b4b\u65a4\u91d1\u4eca\u6d25\u895f\u7d27\u9526\u4ec5\u8c28\u8fdb\u9773\u664b\u7981\u8fd1\u70ec\u6d78\u5c3d\u537a\u8369\u5807\u5664\u9991\u5ed1\u5997\u7f19\u747e\u69ff\u8d46\u89d0\u9485\u9513\u887f\u77dc","jing":"\u52b2\u8346\u5162\u830e\u775b\u6676\u9cb8\u4eac\u60ca\u7cbe\u7cb3\u7ecf\u4e95\u8b66\u666f\u9888\u9759\u5883\u656c\u955c\u5f84\u75c9\u9756\u7adf\u7ade\u51c0\u522d\u5106\u9631\u83c1\u734d\u61ac\u6cfe\u8ff3\u5f2a\u5a67\u80bc\u80eb\u8148\u65cc","jiong":"\u70af\u7a98\u5182\u8fe5\u6243","jiu":"\u63ea\u7a76\u7ea0\u7396\u97ed\u4e45\u7078\u4e5d\u9152\u53a9\u6551\u65e7\u81fc\u8205\u548e\u5c31\u759a\u50e6\u557e\u9604\u67e9\u6855\u9e6b\u8d73\u9b0f","ju":"\u97a0\u62d8\u72d9\u75bd\u9a79\u83ca\u5c40\u5480\u77e9\u4e3e\u6cae\u805a\u62d2\u636e\u5de8\u5177\u8ddd\u8e1e\u952f\u4ff1\u53e5\u60e7\u70ac\u5267\u5028\u8bb5\u82e3\u82f4\u8392\u63ac\u907d\u5c66\u741a\u67b8\u6910\u6998\u6989\u6a58\u728b\u98d3\u949c\u9514\u7aad\u88fe\u8d84\u91b5\u8e3d\u9f83\u96ce\u97ab","juan":"\u6350\u9e43\u5a1f\u5026\u7737\u5377\u7ee2\u9104\u72f7\u6d93\u684a\u8832\u9529\u954c\u96bd","jue":"\u6485\u652b\u6289\u6398\u5014\u7235\u89c9\u51b3\u8bc0\u7edd\u53a5\u5282\u8c32\u77cd\u8568\u5658\u5d1b\u7357\u5b53\u73cf\u6877\u6a5b\u721d\u9562\u8e76\u89d6","jun":"\u5747\u83cc\u94a7\u519b\u541b\u5cfb\u4fca\u7ae3\u6d5a\u90e1\u9a8f\u6343\u72fb\u76b2\u7b60\u9e87","ka":"\u5580\u5496\u5361\u4f67\u5494\u80e9","ke":"\u54af\u5777\u82db\u67ef\u68f5\u78d5\u9897\u79d1\u58f3\u54b3\u53ef\u6e34\u514b\u523b\u5ba2\u8bfe\u5ca2\u606a\u6e98\u9a92\u7f02\u73c2\u8f72\u6c2a\u778c\u94b6\u75b4\u7aa0\u874c\u9ac1","kai":"\u5f00\u63e9\u6977\u51ef\u6168\u5240\u57b2\u8488\u5ffe\u607a\u94e0\u950e","kan":"\u520a\u582a\u52d8\u574e\u780d\u770b\u4f83\u51f5\u83b0\u83b6\u6221\u9f9b\u77b0","kang":"\u5eb7\u6177\u7ce0\u625b\u6297\u4ea2\u7095\u5751\u4f09\u95f6\u94aa","kao":"\u8003\u62f7\u70e4\u9760\u5c3b\u6832\u7292\u94d0","ken":"\u80af\u5543\u57a6\u6073\u57a0\u88c9\u9880","keng":"\u542d\u5fd0\u94ff","kong":"\u7a7a\u6050\u5b54\u63a7\u5025\u5d06\u7b9c","kou":"\u62a0\u53e3\u6263\u5bc7\u82a4\u853b\u53e9\u770d\u7b58","ku":"\u67af\u54ed\u7a9f\u82e6\u9177\u5e93\u88e4\u5233\u5800\u55be\u7ed4\u9ab7","kua":"\u5938\u57ae\u630e\u8de8\u80ef\u4f89","kuai":"\u5757\u7b77\u4fa9\u5feb\u84af\u90d0\u8489\u72ef\u810d","kuan":"\u5bbd\u6b3e\u9acb","kuang":"\u5321\u7b50\u72c2\u6846\u77ff\u7736\u65f7\u51b5\u8bd3\u8bf3\u909d\u5739\u593c\u54d0\u7ea9\u8d36","kui":"\u4e8f\u76d4\u5cbf\u7aa5\u8475\u594e\u9b41\u5080\u9988\u6127\u6e83\u9997\u532e\u5914\u9697\u63c6\u55b9\u559f\u609d\u6126\u9615\u9035\u668c\u777d\u8069\u8770\u7bd1\u81fe\u8dec","kun":"\u5764\u6606\u6346\u56f0\u6083\u9603\u7428\u951f\u918c\u9cb2\u9ae1","kuo":"\u62ec\u6269\u5ed3\u9614\u86de","la":"\u5783\u62c9\u5587\u8721\u814a\u8fa3\u5566\u524c\u647a\u908b\u65ef\u782c\u760c","lai":"\u83b1\u6765\u8d56\u5d03\u5f95\u6d9e\u6fd1\u8d49\u7750\u94fc\u765e\u7c41","lan":"\u84dd\u5a6a\u680f\u62e6\u7bee\u9611\u5170\u6f9c\u8c30\u63fd\u89c8\u61d2\u7f06\u70c2\u6ee5\u5549\u5c9a\u61d4\u6f24\u6984\u6593\u7f71\u9567\u8934","lang":"\u7405\u6994\u72fc\u5eca\u90ce\u6717\u6d6a\u83a8\u8497\u5577\u9606\u9512\u7a02\u8782","lao":"\u635e\u52b3\u7262\u8001\u4f6c\u59e5\u916a\u70d9\u6d9d\u5520\u5d02\u6833\u94d1\u94f9\u75e8\u91aa","le":"\u52d2\u4e50\u808b\u4ec2\u53fb\u561e\u6cd0\u9cd3","lei":"\u96f7\u956d\u857e\u78ca\u7d2f\u5121\u5792\u64c2\u7c7b\u6cea\u7fb8\u8bd4\u837d\u54a7\u6f2f\u5ad8\u7f27\u6a91\u8012\u9179","ling":"\u68f1\u51b7\u62ce\u73b2\u83f1\u96f6\u9f84\u94c3\u4f36\u7f9a\u51cc\u7075\u9675\u5cad\u9886\u53e6\u4ee4\u9143\u5844\u82d3\u5464\u56f9\u6ce0\u7eeb\u67c3\u68c2\u74f4\u8046\u86c9\u7fce\u9cae","leng":"\u695e\u6123","li":"\u5398\u68a8\u7281\u9ece\u7bf1\u72f8\u79bb\u6f13\u7406\u674e\u91cc\u9ca4\u793c\u8389\u8354\u540f\u6817\u4e3d\u5389\u52b1\u783e\u5386\u5229\u5088\u4f8b\u4fd0\u75e2\u7acb\u7c92\u6ca5\u96b6\u529b\u7483\u54e9\u4fea\u4fda\u90e6\u575c\u82c8\u8385\u84e0\u85dc\u6369\u5456\u5533\u55b1\u7301\u6ea7\u6fa7\u9026\u5a0c\u5ae0\u9a8a\u7f21\u73de\u67a5\u680e\u8f79\u623e\u783a\u8a48\u7f79\u9502\u9e42\u75a0\u75ac\u86ce\u870a\u8821\u7b20\u7be5\u7c9d\u91b4\u8dde\u96f3\u9ca1\u9ce2\u9ee7","lian":"\u4fe9\u8054\u83b2\u8fde\u9570\u5ec9\u601c\u6d9f\u5e18\u655b\u8138\u94fe\u604b\u70bc\u7ec3\u631b\u8539\u5941\u6f4b\u6fc2\u5a08\u740f\u695d\u6b93\u81c1\u81a6\u88e2\u880a\u9ca2","liang":"\u7cae\u51c9\u6881\u7cb1\u826f\u4e24\u8f86\u91cf\u667e\u4eae\u8c05\u589a\u690b\u8e09\u9753\u9b49","liao":"\u64a9\u804a\u50da\u7597\u71ce\u5be5\u8fbd\u6f66\u4e86\u6482\u9563\u5ed6\u6599\u84fc\u5c25\u5639\u7360\u5bee\u7f2d\u948c\u9e69\u8022","lie":"\u5217\u88c2\u70c8\u52a3\u730e\u51bd\u57d2\u6d0c\u8d94\u8e90\u9b23","lin":"\u7433\u6797\u78f7\u9716\u4e34\u90bb\u9cde\u6dcb\u51db\u8d41\u541d\u853a\u5d99\u5eea\u9074\u6aa9\u8f9a\u77b5\u7cbc\u8e8f\u9e9f","liu":"\u6e9c\u7409\u69b4\u786b\u998f\u7559\u5218\u7624\u6d41\u67f3\u516d\u62a1\u507b\u848c\u6cd6\u6d4f\u905b\u9a9d\u7efa\u65d2\u7198\u950d\u954f\u9e68\u938f","long":"\u9f99\u804b\u5499\u7b3c\u7abf\u9686\u5784\u62e2\u9647\u5f04\u5785\u830f\u6cf7\u73d1\u680a\u80e7\u783b\u7643","lou":"\u697c\u5a04\u6402\u7bd3\u6f0f\u964b\u55bd\u5d5d\u9542\u7618\u8027\u877c\u9ac5","lu":"\u82a6\u5362\u9885\u5e90\u7089\u63b3\u5364\u864f\u9c81\u9e93\u788c\u9732\u8def\u8d42\u9e7f\u6f5e\u7984\u5f55\u9646\u622e\u5786\u6445\u64b8\u565c\u6cf8\u6e0c\u6f09\u7490\u680c\u6a79\u8f73\u8f82\u8f98\u6c07\u80ea\u9565\u9e2c\u9e6d\u7c0f\u823b\u9c88","lv":"\u9a74\u5415\u94dd\u4fa3\u65c5\u5c65\u5c61\u7f15\u8651\u6c2f\u5f8b\u7387\u6ee4\u7eff\u634b\u95fe\u6988\u8182\u7a06\u891b","luan":"\u5ce6\u5b6a\u6ee6\u5375\u4e71\u683e\u9e3e\u92ae","lue":"\u63a0\u7565\u950a","lun":"\u8f6e\u4f26\u4ed1\u6ca6\u7eb6\u8bba\u56f5","luo":"\u841d\u87ba\u7f57\u903b\u9523\u7ba9\u9aa1\u88f8\u843d\u6d1b\u9a86\u7edc\u502e\u8366\u645e\u7321\u6cfa\u6924\u8136\u9559\u7630\u96d2","ma":"\u5988\u9ebb\u739b\u7801\u8682\u9a6c\u9a82\u561b\u5417\u551b\u72b8\u5b37\u6769\u9ebd","mai":"\u57cb\u4e70\u9ea6\u5356\u8fc8\u8109\u52a2\u836c\u54aa\u973e","man":"\u7792\u9992\u86ee\u6ee1\u8513\u66fc\u6162\u6f2b\u8c29\u5881\u5e54\u7f26\u71b3\u9558\u989f\u87a8\u9cd7\u9794","mang":"\u8292\u832b\u76f2\u5fd9\u83bd\u9099\u6f2d\u6726\u786d\u87d2","meng":"\u6c13\u840c\u8499\u6aac\u76df\u9530\u731b\u68a6\u5b5f\u52d0\u750d\u77a2\u61f5\u791e\u867b\u8722\u8813\u824b\u8268\u9efe","miao":"\u732b\u82d7\u63cf\u7784\u85d0\u79d2\u6e3a\u5e99\u5999\u55b5\u9088\u7f08\u7f2a\u676a\u6dfc\u7707\u9e4b\u8731","mao":"\u8305\u951a\u6bdb\u77db\u94c6\u536f\u8302\u5192\u5e3d\u8c8c\u8d38\u4f94\u88a4\u52d6\u8306\u5cc1\u7441\u6634\u7266\u8004\u65c4\u61cb\u7780\u86d1\u8765\u87ca\u9ae6","me":"\u4e48","mei":"\u73ab\u679a\u6885\u9176\u9709\u7164\u6ca1\u7709\u5a92\u9541\u6bcf\u7f8e\u6627\u5bd0\u59b9\u5a9a\u5776\u8393\u5d4b\u7338\u6d7c\u6e44\u6963\u9545\u9e5b\u8882\u9b45","men":"\u95e8\u95f7\u4eec\u626a\u739f\u7116\u61d1\u9494","mi":"\u772f\u919a\u9761\u7cdc\u8ff7\u8c1c\u5f25\u7c73\u79d8\u89c5\u6ccc\u871c\u5bc6\u5e42\u8288\u5196\u8c27\u863c\u5627\u7315\u736f\u6c68\u5b93\u5f2d\u8112\u6549\u7cf8\u7e3b\u9e8b","mian":"\u68c9\u7720\u7ef5\u5195\u514d\u52c9\u5a29\u7f05\u9762\u6c94\u6e4e\u817c\u7704","mie":"\u8511\u706d\u54a9\u881b\u7bfe","min":"\u6c11\u62bf\u76bf\u654f\u60af\u95fd\u82e0\u5cb7\u95f5\u6cef\u73c9","ming":"\u660e\u879f\u9e23\u94ed\u540d\u547d\u51a5\u8317\u6e9f\u669d\u7791\u9169","miu":"\u8c2c","mo":"\u6478\u6479\u8611\u6a21\u819c\u78e8\u6469\u9b54\u62b9\u672b\u83ab\u58a8\u9ed8\u6cab\u6f20\u5bde\u964c\u8c1f\u8309\u84e6\u998d\u5aeb\u9546\u79e3\u763c\u8031\u87c6\u8c8a\u8c98","mou":"\u8c0b\u725f\u67d0\u53b6\u54de\u5a7a\u7738\u936a","mu":"\u62c7\u7261\u4ea9\u59c6\u6bcd\u5893\u66ae\u5e55\u52df\u6155\u6728\u76ee\u7766\u7267\u7a46\u4eeb\u82dc\u5452\u6c90\u6bea\u94bc","na":"\u62ff\u54ea\u5450\u94a0\u90a3\u5a1c\u7eb3\u5185\u637a\u80ad\u954e\u8872\u7bac","nai":"\u6c16\u4e43\u5976\u8010\u5948\u9f10\u827f\u8418\u67f0","nan":"\u5357\u7537\u96be\u56ca\u5583\u56e1\u6960\u8169\u877b\u8d67","nao":"\u6320\u8111\u607c\u95f9\u5b6c\u57b4\u7331\u7459\u7847\u94d9\u86f2","ne":"\u6dd6\u5462\u8bb7","nei":"\u9981","nen":"\u5ae9\u80fd\u6798\u6041","ni":"\u59ae\u9713\u502a\u6ce5\u5c3c\u62df\u4f60\u533f\u817b\u9006\u6eba\u4f32\u576d\u730a\u6029\u6ee0\u6635\u65ce\u7962\u615d\u7768\u94cc\u9cb5","nian":"\u852b\u62c8\u5e74\u78be\u64b5\u637b\u5ff5\u5eff\u8f87\u9ecf\u9c87\u9cb6","niang":"\u5a18\u917f","niao":"\u9e1f\u5c3f\u8311\u5b32\u8132\u8885","nie":"\u634f\u8042\u5b7d\u556e\u954a\u954d\u6d85\u4e5c\u9667\u8616\u55eb\u8080\u989e\u81ec\u8e51","nin":"\u60a8\u67e0","ning":"\u72de\u51dd\u5b81\u62e7\u6cde\u4f5e\u84e5\u549b\u752f\u804d","niu":"\u725b\u626d\u94ae\u7ebd\u72c3\u5ff8\u599e\u86b4","nong":"\u8113\u6d53\u519c\u4fac","nu":"\u5974\u52aa\u6012\u5476\u5e11\u5f29\u80ec\u5b65\u9a7d","nv":"\u5973\u6067\u9495\u8844","nuan":"\u6696","nuenue":"\u8650","nue":"\u759f\u8c11","nuo":"\u632a\u61e6\u7cef\u8bfa\u50a9\u6426\u558f\u9518","ou":"\u54e6\u6b27\u9e25\u6bb4\u85d5\u5455\u5076\u6ca4\u6004\u74ef\u8026","pa":"\u556a\u8db4\u722c\u5e15\u6015\u7436\u8469\u7b62","pai":"\u62cd\u6392\u724c\u5f98\u6e43\u6d3e\u4ff3\u848e","pan":"\u6500\u6f58\u76d8\u78d0\u76fc\u7554\u5224\u53db\u723f\u6cee\u88a2\u897b\u87e0\u8e52","pang":"\u4e53\u5e9e\u65c1\u802a\u80d6\u6ec2\u9004","pao":"\u629b\u5486\u5228\u70ae\u888d\u8dd1\u6ce1\u530f\u72cd\u5e96\u812c\u75b1","pei":"\u5478\u80da\u57f9\u88f4\u8d54\u966a\u914d\u4f69\u6c9b\u638a\u8f94\u5e14\u6de0\u65c6\u952b\u9185\u9708","pen":"\u55b7\u76c6\u6e53","peng":"\u7830\u62a8\u70f9\u6f8e\u5f6d\u84ec\u68da\u787c\u7bf7\u81a8\u670b\u9e4f\u6367\u78b0\u576f\u580b\u562d\u6026\u87db","pi":"\u7812\u9739\u6279\u62ab\u5288\u7435\u6bd7\u5564\u813e\u75b2\u76ae\u5339\u75de\u50fb\u5c41\u8b6c\u4e15\u9674\u90b3\u90eb\u572e\u9f19\u64d7\u567c\u5e80\u5ab2\u7eb0\u6787\u7513\u7765\u7f74\u94cd\u75e6\u7656\u758b\u868d\u8c94","pian":"\u7bc7\u504f\u7247\u9a97\u8c1d\u9a88\u728f\u80fc\u890a\u7fe9\u8e41","piao":"\u98d8\u6f02\u74e2\u7968\u527d\u560c\u5ad6\u7f25\u6b8d\u779f\u87b5","pie":"\u6487\u77a5\u4e3f\u82e4\u6c15","pin":"\u62fc\u9891\u8d2b\u54c1\u8058\u62da\u59d8\u5ad4\u6980\u725d\u98a6","ping":"\u4e52\u576a\u82f9\u840d\u5e73\u51ed\u74f6\u8bc4\u5c4f\u4fdc\u5a09\u67b0\u9c86","po":"\u5761\u6cfc\u9887\u5a46\u7834\u9b44\u8feb\u7c95\u53f5\u9131\u6ea5\u73c0\u948b\u94b7\u76a4\u7b38","pou":"\u5256\u88d2\u8e23","pu":"\u6251\u94fa\u4ec6\u8386\u8461\u83e9\u84b2\u57d4\u6734\u5703\u666e\u6d66\u8c31\u66dd\u7011\u530d\u5657\u6fee\u749e\u6c06\u9564\u9568\u8e7c","qi":"\u671f\u6b3a\u6816\u621a\u59bb\u4e03\u51c4\u6f06\u67d2\u6c8f\u5176\u68cb\u5947\u6b67\u7566\u5d0e\u8110\u9f50\u65d7\u7948\u7941\u9a91\u8d77\u5c82\u4e5e\u4f01\u542f\u5951\u780c\u5668\u6c14\u8fc4\u5f03\u6c7d\u6ce3\u8bab\u4e9f\u4e93\u573b\u8291\u840b\u847a\u5601\u5c7a\u5c90\u6c54\u6dc7\u9a90\u7eee\u742a\u7426\u675e\u6864\u69ed\u6b39\u797a\u61a9\u789b\u86f4\u871e\u7da6\u7dae\u8dbf\u8e4a\u9ccd\u9e92","qia":"\u6390\u6070\u6d3d\u845c","qian":"\u7275\u6266\u948e\u94c5\u5343\u8fc1\u7b7e\u4edf\u8c26\u4e7e\u9ed4\u94b1\u94b3\u524d\u6f5c\u9063\u6d45\u8c34\u5811\u5d4c\u6b20\u6b49\u4f65\u9621\u828a\u82a1\u8368\u63ae\u5c8d\u60ad\u614a\u9a9e\u6434\u8930\u7f31\u6920\u80b7\u6106\u94a4\u8654\u7b9d","qiang":"\u67aa\u545b\u8154\u7f8c\u5899\u8537\u5f3a\u62a2\u5af1\u6a2f\u6217\u709d\u9516\u9535\u956a\u8941\u8723\u7f9f\u8deb\u8dc4","qiao":"\u6a47\u9539\u6572\u6084\u6865\u77a7\u4e54\u4fa8\u5de7\u9798\u64ac\u7fd8\u5ced\u4fcf\u7a8d\u5281\u8bee\u8c2f\u835e\u6100\u6194\u7f32\u6a35\u6bf3\u7857\u8df7\u9792","qie":"\u5207\u8304\u4e14\u602f\u7a83\u90c4\u553c\u60ec\u59be\u6308\u9532\u7ba7","qin":"\u94a6\u4fb5\u4eb2\u79e6\u7434\u52e4\u82b9\u64d2\u79bd\u5bdd\u6c81\u82a9\u84c1\u8572\u63ff\u5423\u55ea\u5659\u6eb1\u6a8e\u8793\u887e","qing":"\u9752\u8f7b\u6c22\u503e\u537f\u6e05\u64ce\u6674\u6c30\u60c5\u9877\u8bf7\u5e86\u5029\u82d8\u570a\u6aa0\u78ec\u873b\u7f44\u7b90\u8b26\u9cad\u9ee5","qiong":"\u743c\u7a77\u909b\u8315\u7a79\u7b47\u928e","qiu":"\u79cb\u4e18\u90b1\u7403\u6c42\u56da\u914b\u6cc5\u4fc5\u6c3d\u5def\u827d\u72b0\u6e6b\u9011\u9052\u6978\u8d47\u9e20\u866c\u86af\u8764\u88d8\u7cd7\u9cc5\u9f3d","qu":"\u8d8b\u533a\u86c6\u66f2\u8eaf\u5c48\u9a71\u6e20\u53d6\u5a36\u9f8b\u8da3\u53bb\u8bce\u52ac\u8556\u8627\u5c96\u8862\u9612\u74a9\u89d1\u6c0d\u795b\u78f2\u766f\u86d0\u883c\u9eb4\u77bf\u9ee2","quan":"\u5708\u98a7\u6743\u919b\u6cc9\u5168\u75ca\u62f3\u72ac\u5238\u529d\u8be0\u8343\u737e\u609b\u7efb\u8f81\u754e\u94e8\u8737\u7b4c\u9b08","que":"\u7f3a\u7094\u7638\u5374\u9e4a\u69b7\u786e\u96c0\u9619\u60ab","qun":"\u88d9\u7fa4\u9021","ran":"\u7136\u71c3\u5189\u67d3\u82d2\u9aef","rang":"\u74e4\u58e4\u6518\u56b7\u8ba9\u79b3\u7a70","rao":"\u9976\u6270\u7ed5\u835b\u5a06\u6861","ruo":"\u60f9\u82e5\u5f31","re":"\u70ed\u504c","ren":"\u58ec\u4ec1\u4eba\u5fcd\u97e7\u4efb\u8ba4\u5203\u598a\u7eab\u4ede\u834f\u845a\u996a\u8f6b\u7a14\u887d","reng":"\u6254\u4ecd","ri":"\u65e5","rong":"\u620e\u8338\u84c9\u8363\u878d\u7194\u6eb6\u5bb9\u7ed2\u5197\u5d58\u72e8\u7f1b\u6995\u877e","rou":"\u63c9\u67d4\u8089\u7cc5\u8e42\u97a3","ru":"\u8339\u8815\u5112\u5b7a\u5982\u8fb1\u4e73\u6c5d\u5165\u8925\u84d0\u85b7\u5685\u6d33\u6ebd\u6fe1\u94f7\u8966\u98a5","ruan":"\u8f6f\u962e\u670a","rui":"\u854a\u745e\u9510\u82ae\u8564\u777f\u868b","run":"\u95f0\u6da6","sa":"\u6492\u6d12\u8428\u5345\u4ee8\u6332\u98d2","sai":"\u816e\u9cc3\u585e\u8d5b\u567b","san":"\u4e09\u53c1\u4f1e\u6563\u5f61\u9993\u6c35\u6bf5\u7cc1\u9730","sang":"\u6851\u55d3\u4e27\u6421\u78c9\u98a1","sao":"\u6414\u9a9a\u626b\u5ac2\u57fd\u81ca\u7619\u9ccb","se":"\u745f\u8272\u6da9\u556c\u94e9\u94ef\u7a51","sen":"\u68ee","seng":"\u50e7","sha":"\u838e\u7802\u6740\u5239\u6c99\u7eb1\u50bb\u5565\u715e\u810e\u6b43\u75e7\u88df\u970e\u9ca8","shai":"\u7b5b\u6652\u917e","shan":"\u73ca\u82eb\u6749\u5c71\u5220\u717d\u886b\u95ea\u9655\u64c5\u8d61\u81b3\u5584\u6c55\u6247\u7f2e\u5261\u8baa\u912f\u57cf\u829f\u6f78\u59d7\u9a9f\u81bb\u9490\u759d\u87ee\u8222\u8dda\u9cdd","shang":"\u5892\u4f24\u5546\u8d4f\u664c\u4e0a\u5c1a\u88f3\u57a7\u7ef1\u6b87\u71b5\u89de","shao":"\u68a2\u634e\u7a0d\u70e7\u828d\u52fa\u97f6\u5c11\u54e8\u90b5\u7ecd\u52ad\u82d5\u6f72\u86f8\u7b24\u7b72\u8244","she":"\u5962\u8d4a\u86c7\u820c\u820d\u8d66\u6444\u5c04\u6151\u6d89\u793e\u8bbe\u538d\u4f58\u731e\u7572\u9e9d","shen":"\u7837\u7533\u547b\u4f38\u8eab\u6df1\u5a20\u7ec5\u795e\u6c88\u5ba1\u5a76\u751a\u80be\u614e\u6e17\u8bdc\u8c02\u5432\u54c2\u6e16\u6939\u77e7\u8703","sheng":"\u58f0\u751f\u7525\u7272\u5347\u7ef3\u7701\u76db\u5269\u80dc\u5723\u4e1e\u6e11\u5ab5\u771a\u7b19","shi":"\u5e08\u5931\u72ee\u65bd\u6e7f\u8bd7\u5c38\u8671\u5341\u77f3\u62fe\u65f6\u4ec0\u98df\u8680\u5b9e\u8bc6\u53f2\u77e2\u4f7f\u5c4e\u9a76\u59cb\u5f0f\u793a\u58eb\u4e16\u67ff\u4e8b\u62ed\u8a93\u901d\u52bf\u662f\u55dc\u566c\u9002\u4ed5\u4f8d\u91ca\u9970\u6c0f\u5e02\u6043\u5ba4\u89c6\u8bd5\u8c25\u57d8\u83b3\u84cd\u5f11\u5511\u9963\u8f7c\u8006\u8d33\u70bb\u793b\u94c8\u94ca\u87ab\u8210\u7b6e\u8c55\u9ca5\u9cba","shou":"\u6536\u624b\u9996\u5b88\u5bff\u6388\u552e\u53d7\u7626\u517d\u624c\u72e9\u7ef6\u824f","shu":"\u852c\u67a2\u68b3\u6b8a\u6292\u8f93\u53d4\u8212\u6dd1\u758f\u4e66\u8d4e\u5b70\u719f\u85af\u6691\u66d9\u7f72\u8700\u9ecd\u9f20\u5c5e\u672f\u8ff0\u6811\u675f\u620d\u7ad6\u5885\u5eb6\u6570\u6f31\u6055\u500f\u587e\u83fd\u5fc4\u6cad\u6d91\u6f8d\u59dd\u7ebe\u6bf9\u8167\u6bb3\u956f\u79eb\u9e6c","shua":"\u5237\u800d\u5530\u6dae","shuai":"\u6454\u8870\u7529\u5e05\u87c0","shuan":"\u6813\u62f4\u95e9","shuang":"\u971c\u53cc\u723d\u5b40","shui":"\u8c01\u6c34\u7761\u7a0e","shun":"\u542e\u77ac\u987a\u821c\u6042","shuo":"\u8bf4\u7855\u6714\u70c1\u84b4\u6420\u55cd\u6fef\u5981\u69ca\u94c4","si":"\u65af\u6495\u5636\u601d\u79c1\u53f8\u4e1d\u6b7b\u8086\u5bfa\u55e3\u56db\u4f3a\u4f3c\u9972\u5df3\u53ae\u4fdf\u5155\u83e5\u549d\u6c5c\u6cd7\u6f8c\u59d2\u9a77\u7f0c\u7940\u7960\u9536\u9e36\u801c\u86f3\u7b25","song":"\u677e\u8038\u6002\u9882\u9001\u5b8b\u8bbc\u8bf5\u51c7\u83d8\u5d27\u5d69\u5fea\u609a\u6dde\u7ae6","sou":"\u641c\u8258\u64de\u55fd\u53df\u55d6\u55fe\u998a\u6eb2\u98d5\u778d\u953c\u878b","su":"\u82cf\u9165\u4fd7\u7d20\u901f\u7c9f\u50f3\u5851\u6eaf\u5bbf\u8bc9\u8083\u5919\u8c21\u850c\u55c9\u612b\u7c0c\u89eb\u7a23","suan":"\u9178\u849c\u7b97","sui":"\u867d\u968b\u968f\u7ee5\u9ad3\u788e\u5c81\u7a57\u9042\u96a7\u795f\u84d1\u51ab\u8c07\u6fc9\u9083\u71e7\u772d\u7762","sun":"\u5b59\u635f\u7b0b\u836a\u72f2\u98e7\u69ab\u8de3\u96bc","suo":"\u68ad\u5506\u7f29\u7410\u7d22\u9501\u6240\u5522\u55e6\u5a11\u686b\u7743\u7fa7","ta":"\u584c\u4ed6\u5b83\u5979\u5854\u736d\u631e\u8e4b\u8e0f\u95fc\u6ebb\u9062\u69bb\u6c93","tai":"\u80ce\u82d4\u62ac\u53f0\u6cf0\u915e\u592a\u6001\u6c70\u90b0\u85b9\u80bd\u70b1\u949b\u8dc6\u9c90","tan":"\u574d\u644a\u8d2a\u762b\u6ee9\u575b\u6a80\u75f0\u6f6d\u8c2d\u8c08\u5766\u6bef\u8892\u78b3\u63a2\u53f9\u70ad\u90ef\u8548\u6619\u94bd\u952c\u8983","tang":"\u6c64\u5858\u642a\u5802\u68e0\u819b\u5510\u7cd6\u50a5\u9967\u6e8f\u746d\u94f4\u9557\u8025\u8797\u87b3\u7fb0\u91a3","thang":"\u5018\u8eba\u6dcc","theng":"\u8d9f\u70eb","tao":"\u638f\u6d9b\u6ed4\u7ee6\u8404\u6843\u9003\u6dd8\u9676\u8ba8\u5957\u6311\u9f17\u5555\u97ec\u9955","te":"\u7279","teng":"\u85e4\u817e\u75bc\u8a8a\u6ed5","ti":"\u68af\u5254\u8e22\u9511\u63d0\u9898\u8e44\u557c\u4f53\u66ff\u568f\u60d5\u6d95\u5243\u5c49\u8351\u608c\u9016\u7ee8\u7f07\u9e48\u88fc\u918d","tian":"\u5929\u6dfb\u586b\u7530\u751c\u606c\u8214\u8146\u63ad\u5fdd\u9617\u6b84\u754b\u94bf\u86ba","tiao":"\u6761\u8fe2\u773a\u8df3\u4f7b\u7967\u94eb\u7a95\u9f86\u9ca6","tie":"\u8d34\u94c1\u5e16\u841c\u992e","ting":"\u5385\u542c\u70c3\u6c40\u5ef7\u505c\u4ead\u5ead\u633a\u8247\u839b\u8476\u5a77\u6883\u8713\u9706","tong":"\u901a\u6850\u916e\u77b3\u540c\u94dc\u5f64\u7ae5\u6876\u6345\u7b52\u7edf\u75db\u4f5f\u50ee\u4edd\u833c\u55f5\u6078\u6f7c\u783c","tou":"\u5077\u6295\u5934\u900f\u4ea0","tu":"\u51f8\u79c3\u7a81\u56fe\u5f92\u9014\u6d82\u5c60\u571f\u5410\u5154\u580d\u837c\u83df\u948d\u9174","tuan":"\u6e4d\u56e2\u7583","tui":"\u63a8\u9893\u817f\u8715\u892a\u9000\u5fd2\u717a","tun":"\u541e\u5c6f\u81c0\u9968\u66be\u8c5a\u7a80","tuo":"\u62d6\u6258\u8131\u9e35\u9640\u9a6e\u9a7c\u692d\u59a5\u62d3\u553e\u4e47\u4f57\u5768\u5eb9\u6cb1\u67dd\u7823\u7ba8\u8204\u8dce\u9f0d","wa":"\u6316\u54c7\u86d9\u6d3c\u5a03\u74e6\u889c\u4f64\u5a32\u817d","wai":"\u6b6a\u5916","wan":"\u8c4c\u5f2f\u6e7e\u73a9\u987d\u4e38\u70f7\u5b8c\u7897\u633d\u665a\u7696\u60cb\u5b9b\u5a49\u4e07\u8155\u525c\u8284\u82cb\u83c0\u7ea8\u7efe\u742c\u8118\u7579\u873f\u7ba2","wang":"\u6c6a\u738b\u4ea1\u6789\u7f51\u5f80\u65fa\u671b\u5fd8\u5984\u7f54\u5c22\u60d8\u8f8b\u9b4d","wei":"\u5a01\u5dcd\u5fae\u5371\u97e6\u8fdd\u6845\u56f4\u552f\u60df\u4e3a\u6f4d\u7ef4\u82c7\u840e\u59d4\u4f1f\u4f2a\u5c3e\u7eac\u672a\u851a\u5473\u754f\u80c3\u5582\u9b4f\u4f4d\u6e2d\u8c13\u5c09\u6170\u536b\u502d\u504e\u8bff\u9688\u8473\u8587\u5e0f\u5e37\u5d34\u5d6c\u7325\u732c\u95f1\u6ca9\u6d27\u6da0\u9036\u5a13\u73ae\u97ea\u8ece\u709c\u7168\u71a8\u75ff\u8249\u9c94","wen":"\u761f\u6e29\u868a\u6587\u95fb\u7eb9\u543b\u7a33\u7d0a\u95ee\u520e\u6120\u960c\u6c76\u74ba\u97eb\u6b81\u96ef","weng":"\u55e1\u7fc1\u74ee\u84ca\u8579","wo":"\u631d\u8717\u6da1\u7a9d\u6211\u65a1\u5367\u63e1\u6c83\u83b4\u5e44\u6e25\u674c\u809f\u9f8c","wu":"\u5deb\u545c\u94a8\u4e4c\u6c61\u8bec\u5c4b\u65e0\u829c\u68a7\u543e\u5434\u6bcb\u6b66\u4e94\u6342\u5348\u821e\u4f0d\u4fae\u575e\u620a\u96fe\u6664\u7269\u52ff\u52a1\u609f\u8bef\u5140\u4ef5\u9622\u90ac\u572c\u82b4\u5e91\u6003\u5fe4\u6d6f\u5be4\u8fd5\u59a9\u9a9b\u727e\u7110\u9e49\u9e5c\u8708\u92c8\u9f2f","xi":"\u6614\u7199\u6790\u897f\u7852\u77fd\u6670\u563b\u5438\u9521\u727a\u7a00\u606f\u5e0c\u6089\u819d\u5915\u60dc\u7184\u70ef\u6eaa\u6c50\u7280\u6a84\u88ad\u5e2d\u4e60\u5ab3\u559c\u94e3\u6d17\u7cfb\u9699\u620f\u7ec6\u50d6\u516e\u96b0\u90d7\u831c\u8478\u84f0\u595a\u550f\u5f99\u9969\u960b\u6d60\u6dc5\u5c63\u5b09\u73ba\u6a28\u66e6\u89cb\u6b37\u71b9\u798a\u79a7\u94b8\u7699\u7a78\u8725\u87cb\u823e\u7fb2\u7c9e\u7fd5\u91af\u9f37","xia":"\u778e\u867e\u5323\u971e\u8f96\u6687\u5ce1\u4fa0\u72ed\u4e0b\u53a6\u590f\u5413\u6380\u846d\u55c4\u72ce\u9050\u7455\u7856\u7615\u7f45\u9ee0","xian":"\u9528\u5148\u4ed9\u9c9c\u7ea4\u54b8\u8d24\u8854\u8237\u95f2\u6d8e\u5f26\u5acc\u663e\u9669\u73b0\u732e\u53bf\u817a\u9985\u7fa1\u5baa\u9677\u9650\u7ebf\u51bc\u85d3\u5c98\u7303\u66b9\u5a34\u6c19\u7946\u9e47\u75eb\u86ac\u7b45\u7c7c\u9170\u8df9","xiang":"\u76f8\u53a2\u9576\u9999\u7bb1\u8944\u6e58\u4e61\u7fd4\u7965\u8be6\u60f3\u54cd\u4eab\u9879\u5df7\u6a61\u50cf\u5411\u8c61\u8297\u8459\u9977\u5ea0\u9aa7\u7f03\u87d3\u9c9e\u98e8","xiao":"\u8427\u785d\u9704\u524a\u54ee\u56a3\u9500\u6d88\u5bb5\u6dc6\u6653\u5c0f\u5b5d\u6821\u8096\u5578\u7b11\u6548\u54d3\u54bb\u5d24\u6f47\u900d\u9a81\u7ee1\u67ad\u67b5\u7b71\u7bab\u9b48","xie":"\u6954\u4e9b\u6b47\u874e\u978b\u534f\u631f\u643a\u90aa\u659c\u80c1\u8c10\u5199\u68b0\u5378\u87f9\u61c8\u6cc4\u6cfb\u8c22\u5c51\u5055\u4eb5\u52f0\u71ee\u85a4\u64b7\u5ee8\u7023\u9082\u7ec1\u7f2c\u69ad\u698d\u6b59\u8e9e","xin":"\u85aa\u82af\u950c\u6b23\u8f9b\u65b0\u5ffb\u5fc3\u4fe1\u8845\u56df\u99a8\u8398\u6b46\u94fd\u946b","xing":"\u661f\u8165\u7329\u60fa\u5174\u5211\u578b\u5f62\u90a2\u884c\u9192\u5e78\u674f\u6027\u59d3\u9649\u8347\u8365\u64e4\u60bb\u784e","xiong":"\u5144\u51f6\u80f8\u5308\u6c79\u96c4\u718a\u828e","xiu":"\u4f11\u4fee\u7f9e\u673d\u55c5\u9508\u79c0\u8896\u7ee3\u83a0\u5cab\u9990\u5ea5\u9e3a\u8c85\u9af9","xu":"\u589f\u620c\u9700\u865a\u5618\u987b\u5f90\u8bb8\u84c4\u9157\u53d9\u65ed\u5e8f\u755c\u6064\u7d6e\u5a7f\u7eea\u7eed\u8bb4\u8be9\u5729\u84ff\u6035\u6d2b\u6e86\u987c\u6829\u7166\u7809\u76f1\u80e5\u7cc8\u9191","xuan":"\u8f69\u55a7\u5ba3\u60ac\u65cb\u7384\u9009\u7663\u7729\u7eda\u5107\u8c16\u8431\u63ce\u9994\u6ceb\u6d35\u6e32\u6f29\u7487\u6966\u6684\u70ab\u714a\u78b9\u94c9\u955f\u75c3","xue":"\u9774\u859b\u5b66\u7a74\u96ea\u8840\u5671\u6cf6\u9cd5","xun":"\u52cb\u718f\u5faa\u65ec\u8be2\u5bfb\u9a6f\u5de1\u6b89\u6c5b\u8bad\u8baf\u900a\u8fc5\u5dfd\u57d9\u8340\u85b0\u5ccb\u5f87\u6d54\u66db\u7aa8\u91ba\u9c9f","ya":"\u538b\u62bc\u9e26\u9e2d\u5440\u4e2b\u82bd\u7259\u869c\u5d16\u8859\u6daf\u96c5\u54d1\u4e9a\u8bb6\u4f22\u63e0\u5416\u5c88\u8fd3\u5a05\u740a\u6860\u6c29\u7811\u775a\u75d6","yan":"\u7109\u54bd\u9609\u70df\u6df9\u76d0\u4e25\u7814\u8712\u5ca9\u5ef6\u8a00\u989c\u960e\u708e\u6cbf\u5944\u63a9\u773c\u884d\u6f14\u8273\u5830\u71d5\u538c\u781a\u96c1\u5501\u5f66\u7130\u5bb4\u8c1a\u9a8c\u53a3\u9765\u8d5d\u4fe8\u5043\u5156\u8ba0\u8c33\u90fe\u9122\u82ab\u83f8\u5d26\u6079\u95eb\u960f\u6d07\u6e6e\u6edf\u598d\u5ae3\u7430\u664f\u80ed\u814c\u7131\u7f68\u7b75\u917d\u9b47\u990d\u9f39","yang":"\u6b83\u592e\u9e2f\u79e7\u6768\u626c\u4f6f\u75a1\u7f8a\u6d0b\u9633\u6c27\u4ef0\u75d2\u517b\u6837\u6f3e\u5f89\u600f\u6cf1\u7080\u70ca\u6059\u86d8\u9785","yao":"\u9080\u8170\u5996\u7476\u6447\u5c27\u9065\u7a91\u8c23\u59da\u54ac\u8200\u836f\u8981\u8000\u592d\u723b\u5406\u5d3e\u5fad\u7039\u5e7a\u73e7\u6773\u66dc\u80b4\u9e5e\u7a88\u7e47\u9cd0","ye":"\u6930\u564e\u8036\u7237\u91ce\u51b6\u4e5f\u9875\u6396\u4e1a\u53f6\u66f3\u814b\u591c\u6db2\u8c12\u90ba\u63f6\u9980\u6654\u70e8\u94d8","yi":"\u4e00\u58f9\u533b\u63d6\u94f1\u4f9d\u4f0a\u8863\u9890\u5937\u9057\u79fb\u4eea\u80f0\u7591\u6c82\u5b9c\u59e8\u5f5d\u6905\u8681\u501a\u5df2\u4e59\u77e3\u4ee5\u827a\u6291\u6613\u9091\u5c79\u4ebf\u5f79\u81c6\u9038\u8084\u75ab\u4ea6\u88d4\u610f\u6bc5\u5fc6\u4e49\u76ca\u6ea2\u8be3\u8bae\u8c0a\u8bd1\u5f02\u7ffc\u7fcc\u7ece\u5208\u5293\u4f7e\u8bd2\u572a\u572f\u57f8\u61ff\u82e1\u858f\u5f08\u5955\u6339\u5f0b\u5453\u54a6\u54bf\u566b\u5cc4\u5db7\u7317\u9974\u603f\u6021\u6092\u6f2a\u8fe4\u9a7f\u7f22\u6baa\u8d3b\u65d6\u71a0\u9487\u9552\u9571\u75cd\u7617\u7654\u7fca\u8864\u8734\u8223\u7fbf\u7ff3\u914f\u9edf","yin":"\u8335\u836b\u56e0\u6bb7\u97f3\u9634\u59fb\u541f\u94f6\u6deb\u5bc5\u996e\u5c39\u5f15\u9690\u5370\u80e4\u911e\u5819\u831a\u5591\u72fa\u5924\u6c24\u94df\u763e\u8693\u972a\u9f88","ying":"\u82f1\u6a31\u5a74\u9e70\u5e94\u7f28\u83b9\u8424\u8425\u8367\u8747\u8fce\u8d62\u76c8\u5f71\u9896\u786c\u6620\u5b34\u90e2\u8314\u83ba\u8426\u6484\u5624\u81ba\u6ee2\u6f46\u701b\u745b\u748e\u6979\u9e66\u763f\u988d\u7f42","yo":"\u54df\u5537","yong":"\u62e5\u4f63\u81c3\u75c8\u5eb8\u96cd\u8e0a\u86f9\u548f\u6cf3\u6d8c\u6c38\u607f\u52c7\u7528\u4fd1\u58c5\u5889\u6175\u9095\u955b\u752c\u9cd9\u9954","you":"\u5e7d\u4f18\u60a0\u5fe7\u5c24\u7531\u90ae\u94c0\u72b9\u6cb9\u6e38\u9149\u6709\u53cb\u53f3\u4f51\u91c9\u8bf1\u53c8\u5e7c\u5363\u6538\u4f91\u83b8\u5466\u56ff\u5ba5\u67da\u7337\u7256\u94d5\u75a3\u8763\u9c7f\u9edd\u9f2c","yu":"\u8fc2\u6de4\u4e8e\u76c2\u6986\u865e\u611a\u8206\u4f59\u4fde\u903e\u9c7c\u6109\u6e1d\u6e14\u9685\u4e88\u5a31\u96e8\u4e0e\u5c7f\u79b9\u5b87\u8bed\u7fbd\u7389\u57df\u828b\u90c1\u5401\u9047\u55bb\u5cea\u5fa1\u6108\u6b32\u72f1\u80b2\u8a89\u6d74\u5bd3\u88d5\u9884\u8c6b\u9a6d\u79ba\u6bd3\u4f1b\u4fe3\u8c00\u8c15\u8438\u84e3\u63c4\u5581\u5704\u5709\u5d5b\u72f3\u996b\u5ebe\u9608\u59aa\u59a4\u7ea1\u745c\u6631\u89ce\u8174\u6b24\u65bc\u715c\u71e0\u807f\u94b0\u9e46\u7610\u7600\u7ab3\u8753\u7afd\u8201\u96e9\u9f89","yuan":"\u9e33\u6e0a\u51a4\u5143\u57a3\u8881\u539f\u63f4\u8f95\u56ed\u5458\u5706\u733f\u6e90\u7f18\u8fdc\u82d1\u613f\u6028\u9662\u586c\u6c85\u5a9b\u7457\u6a7c\u7230\u7722\u9e22\u8788\u9f0b","yue":"\u66f0\u7ea6\u8d8a\u8dc3\u94a5\u5cb3\u7ca4\u6708\u60a6\u9605\u9fa0\u6a3e\u5216\u94ba","yun":"\u8018\u4e91\u90e7\u5300\u9668\u5141\u8fd0\u8574\u915d\u6655\u97f5\u5b55\u90d3\u82b8\u72c1\u607d\u7ead\u6b92\u6600\u6c32","za":"\u531d\u7838\u6742\u62f6\u5482","zai":"\u683d\u54c9\u707e\u5bb0\u8f7d\u518d\u5728\u54b1\u5d3d\u753e","zan":"\u6512\u6682\u8d5e\u74d2\u661d\u7c2a\u7ccc\u8db1\u933e","zang":"\u8d43\u810f\u846c\u5958\u6215\u81e7","zao":"\u906d\u7cdf\u51ff\u85fb\u67a3\u65e9\u6fa1\u86a4\u8e81\u566a\u9020\u7682\u7076\u71e5\u5523\u7f2b","ze":"\u8d23\u62e9\u5219\u6cfd\u4ec4\u8d5c\u5567\u8fee\u6603\u7b2e\u7ba6\u8234","zei":"\u8d3c","zen":"\u600e\u8c2e","zeng":"\u589e\u618e\u66fe\u8d60\u7f2f\u7511\u7f7e\u9503","zha":"\u624e\u55b3\u6e23\u672d\u8f67\u94e1\u95f8\u7728\u6805\u69a8\u548b\u4e4d\u70b8\u8bc8\u63f8\u5412\u54a4\u54f3\u600d\u781f\u75c4\u86b1\u9f44","zhai":"\u6458\u658b\u5b85\u7a84\u503a\u5be8\u7826","zhan":"\u77bb\u6be1\u8a79\u7c98\u6cbe\u76cf\u65a9\u8f97\u5d2d\u5c55\u8638\u6808\u5360\u6218\u7ad9\u6e5b\u7efd\u8c35\u640c\u65c3","zhang":"\u6a1f\u7ae0\u5f70\u6f33\u5f20\u638c\u6da8\u6756\u4e08\u5e10\u8d26\u4ed7\u80c0\u7634\u969c\u4ec9\u9123\u5e5b\u5d82\u7350\u5adc\u748b\u87d1","zhao":"\u62db\u662d\u627e\u6cbc\u8d75\u7167\u7f69\u5146\u8087\u53ec\u722a\u8bcf\u68f9\u948a\u7b0a","zhe":"\u906e\u6298\u54f2\u86f0\u8f99\u8005\u9517\u8517\u8fd9\u6d59\u8c2a\u966c\u67d8\u8f84\u78d4\u9e67\u891a\u8707\u8d6d","zhen":"\u73cd\u659f\u771f\u7504\u7827\u81fb\u8d1e\u9488\u4fa6\u6795\u75b9\u8bca\u9707\u632f\u9547\u9635\u7f1c\u6862\u699b\u8f78\u8d48\u80d7\u6715\u796f\u755b\u9e29","zheng":"\u84b8\u6323\u7741\u5f81\u72f0\u4e89\u6014\u6574\u62ef\u6b63\u653f\u5e27\u75c7\u90d1\u8bc1\u8be4\u5ce5\u94b2\u94ee\u7b5d","zhi":"\u829d\u679d\u652f\u5431\u8718\u77e5\u80a2\u8102\u6c41\u4e4b\u7ec7\u804c\u76f4\u690d\u6b96\u6267\u503c\u4f84\u5740\u6307\u6b62\u8dbe\u53ea\u65e8\u7eb8\u5fd7\u631a\u63b7\u81f3\u81f4\u7f6e\u5e1c\u5cd9\u5236\u667a\u79e9\u7a1a\u8d28\u7099\u75d4\u6ede\u6cbb\u7a92\u536e\u965f\u90c5\u57f4\u82b7\u646d\u5e19\u5fee\u5f58\u54ab\u9a98\u6809\u67b3\u6800\u684e\u8f75\u8f7e\u6534\u8d3d\u81a3\u7949\u7957\u9ef9\u96c9\u9e37\u75e3\u86ed\u7d77\u916f\u8dd6\u8e2c\u8e2f\u8c78\u89ef","zhong":"\u4e2d\u76c5\u5fe0\u949f\u8877\u7ec8\u79cd\u80bf\u91cd\u4ef2\u4f17\u51a2\u953a\u87bd\u8202\u822f\u8e35","zhou":"\u821f\u5468\u5dde\u6d32\u8bcc\u7ca5\u8f74\u8098\u5e1a\u5492\u76b1\u5b99\u663c\u9aa4\u5544\u7740\u501c\u8bf9\u836e\u9b3b\u7ea3\u80c4\u78a1\u7c40\u8233\u914e\u9cb7","zhu":"\u73e0\u682a\u86db\u6731\u732a\u8bf8\u8bdb\u9010\u7af9\u70db\u716e\u62c4\u77a9\u5631\u4e3b\u8457\u67f1\u52a9\u86c0\u8d2e\u94f8\u7b51\u4f4f\u6ce8\u795d\u9a7b\u4f2b\u4f8f\u90be\u82ce\u8331\u6d19\u6e1a\u6f74\u9a7a\u677c\u69e0\u6a65\u70b7\u94e2\u75b0\u7603\u86b0\u7afa\u7bb8\u7fe5\u8e85\u9e88","zhua":"\u6293","zhuai":"\u62fd","zhuan":"\u4e13\u7816\u8f6c\u64b0\u8d5a\u7bc6\u629f\u556d\u989b","zhuang":"\u6869\u5e84\u88c5\u5986\u649e\u58ee\u72b6\u4e2c","zhui":"\u690e\u9525\u8ffd\u8d58\u5760\u7f00\u8411\u9a93\u7f12","zhun":"\u8c06\u51c6","zhuo":"\u6349\u62d9\u5353\u684c\u7422\u8301\u914c\u707c\u6d4a\u502c\u8bfc\u5ef4\u855e\u64e2\u555c\u6d5e\u6dbf\u6753\u712f\u799a\u65ab","zi":"\u5179\u54a8\u8d44\u59ff\u6ecb\u6dc4\u5b5c\u7d2b\u4ed4\u7c7d\u6ed3\u5b50\u81ea\u6e0d\u5b57\u8c18\u5d6b\u59ca\u5b73\u7f01\u6893\u8f8e\u8d40\u6063\u7726\u9531\u79ed\u8014\u7b2b\u7ca2\u89dc\u8a3e\u9cbb\u9aed","zong":"\u9b03\u68d5\u8e2a\u5b97\u7efc\u603b\u7eb5\u8159\u7cbd","zou":"\u90b9\u8d70\u594f\u63cd\u9139\u9cb0","zu":"\u79df\u8db3\u5352\u65cf\u7956\u8bc5\u963b\u7ec4\u4fce\u83f9\u5550\u5f82\u9a75\u8e74","zuan":"\u94bb\u7e82\u6525\u7f35","zui":"\u5634\u9189\u6700\u7f6a","zun":"\u5c0a\u9075\u6499\u6a3d\u9cdf","zuo":"\u6628\u5de6\u4f50\u67de\u505a\u4f5c\u5750\u5ea7\u961d\u963c\u80d9\u795a\u9162","cou":"\u85ae\u6971\u8f8f\u8160","nang":"\u652e\u54dd\u56d4\u9995\u66e9","o":"\u5594","dia":"\u55f2","chuai":"\u562c\u81aa\u8e39","cen":"\u5c91\u6d94","diu":"\u94e5","nou":"\u8028","fou":"\u7f36","bia":"\u9adf"}; 
    Pinyin._ucfirst=function(l1){ 
        if (l1.length>0) { 
            var first = l1.substr(0,1).toUpperCase(); 
            var spare = l1.substr(1,l1.length); 
            return first + spare; 
        } 
    } 
    Pinyin._arraySearch=function(l1,l2){ 
        for (var name in this._pinyin){ 
            if (this._pinyin[name].indexOf(l1)!=-1) { 
                return this._ucfirst(name); break; 
            } 
        } 
        return false; 
    } 
    Pinyin.get=function(l1){ 
        var l2 = l1.length; 
        var I1 = ""; 
        var reg = new RegExp('[a-zA-Z0-9\- ]'); 
        for (var i=0;i<l2;i++) { 
            var val = l1.substr(i,1); 
            var name = this._arraySearch(val,this._pinyin); 
            if(reg.test(val)) { 
                I1 += val; 
            } else if (name!==false) { 
                I1 += name; 
            } 
        } 
        I1 = I1.replace(/ /g,'-'); 
        while (I1.indexOf('--')>0) { 
            I1 = I1.replace('--','-'); 
        } 
        return I1; 
    } 
    
    //判断是否Opera JS模式
    if(window.opera){window.opera.defineMagicVariable( '$isOperaJsMode', function(){return 1;}, null );}
    if(window.$isOperaJsMode){//Opera UserJs模式下的脚本随页面一起加载
        document.addEventListener('DOMContentLoaded',contentLoaded,false);
    }else{//GM模式下的脚本DOMContentLoaded发生之后才加载
        contentLoaded();
    }

    function reloadFace () {
        log(store("gkr-user-favfaces"));
        var facesdata = store("gkr-user-favfaces").split("\n");
        oldFaces = new Array();
        $.each(facesdata,function(i,n){
            if(n && $.trim(n)){
                oldFaces.push(n);
             }
        });
        defaultMoreFaces[defaultMoreFaces.length-1].faces = oldFaces;

    }

    //--------Util--------
    function store(key, value) {
        if (value) {//存储,发setItem消息
            localStorage.setItem(key, encodeURIComponent(value));

            var obj = {};
            obj[key] = encodeURIComponent(value);
            sendMsg("setItem",obj,function(){});
        }
        else {//读取
            var rtnValue = localStorage.getItem(key);
            try{
                return rtnValue ? decodeURIComponent(rtnValue) : "";
            }catch(e){return "";}
        }
        
    }

    //简单json处理
    function obj2json(o){
        if(!o){return ""};
        return JSON.stringify(o);
    }
    function json2obj(s){
        try{
            return s ? eval("(" + s + ")") : new Object();
        }catch(e){
            return new Object();
        }
    }
    
    //调试
    function log(info){
        if(!debugMode){return;}
        if(console){console.log(info); }
    }

    //--------Util-End-------

    //页面载入
    function contentLoaded() {
        
        //如果是第一次初始化载入默认表情
        if(!store("gkr-user-defaultfaces")){
            store("gkr-user-defaultfaces",defaultFaces.join("\n"));
        }

        //初始化常用表情列表
        if(store("gkr-user-defaultfaces") && $.trim(store("gkr-user-defaultfaces"))){
            var facesdata = store("gkr-user-defaultfaces").split("\n");
            $.each(facesdata,function(i,n){
                if(n && $.trim(n)){
                    faces.push(n);
                }
            });
        }

        //初始化收藏表情列表
        if(store("gkr-user-favfaces") && $.trim(store("gkr-user-favfaces"))){
            var facesdata = store("gkr-user-favfaces").split("\n");
            var oldFaces = defaultMoreFaces[defaultMoreFaces.length-1].faces;
            $.each(facesdata,function(i,n){
                if(n && $.trim(n)){
                    oldFaces.push(n);
                }
            });
        }

        //如果是个人设置页面右侧追加配置项
        if (window.location.href == setHref) {
            //脚本设置区域
            $("<div>").attr("id", "gk-pl-config").appendTo($(".settings-profile-page form").parent()).html('\
                <div id="gk-pl-content" style="display:block;">\
                    <div id="gk-pl-main">\
                        <fieldset><legend title="脚本设置">脚本设置</legend>\
                            <fieldset><legend title="屏蔽的用户ID" >屏蔽ID</legend><ul id="gk-pl-ids"/></fieldset>\
                            <fieldset><legend title="屏蔽的标题关键字">屏蔽关键字</legend>\
                                <ul><li id="gk-pl-addstr"><input type="text" id="gk-pl-str" title="含有此关键字的链接将被屏蔽"/></li></ul>\
                                <ul id="gk-pl-strs"/>\
                            </fieldset>\
                            <fieldset><legend title="常用表情设置">常用表情设置</legend>\
                                <ul id="gk-user-defaultfacesbox"/>\
                            </fieldset>\
                            <fieldset><legend title="收藏表情设置">收藏表情设置</legend>\
                                <ul id="gk-user-favfacesbox"/>\
                            </fieldset>\
                            <a href="javascript:localStorage.setItem(\'gkr-user-groups\',\'\');">重置小组数据</a><br>\
                            <a href="javascript:localStorage.setItem(\'gkr-user-favfaces\',\'\');localStorage.setItem(\'gkr-user-defaultfaces\',\'\');">重置自定义表情数据</a>\
                        </fieldset>\
                    </div>\
                </div>\
            ');
            //关键词Add按钮
            $("<input type='button'>").val("Add").css("width", "35px").click(function(){
                addBlocked("strs", $("#gk-pl-str").val());
                initBlockList();
            }).appendTo("#gk-pl-addstr");
            initBlockList();
            
            
           
            //自定义区保存事件
            $("<textarea>").attr("id","gk-user-defaultfaces").val($.trim(store("gkr-user-defaultfaces"))).css("width", "655px").css("height","150px").blur(function(){
                store("gkr-user-defaultfaces",$("#gk-user-defaultfaces").val() + " ");
            }).appendTo("#gk-user-defaultfacesbox");
            
            $("<textarea>").attr("id","gk-user-favfaces").val($.trim(store("gkr-user-favfaces"))).css("width", "655px").css("height","300px").blur(function(){
                store("gkr-user-favfaces",$("#gk-user-favfaces").val() + " ");
            }).appendTo("#gk-user-favfacesbox");
            

            
        }
        
        //用户悬浮框(果壳测试页面不添加用户悬浮框防止测试页面出错)
        if (window.location.href.indexOf("guokr.com/test") == -1){      
            $('<div id="gkr-hover-box" style="position:absolute; display:none; z-index:9999;  width:250px; height:120px;font-size: 12px;">\
                <s id="gkr-hover-triangle" class="triangle" style="border-width: 6px;border-color:green transparent transparent transparent; border-style:solid dashed dashed dashed;position: absolute;left: 20px;top: 114px;"/>\
                <div style="background-color:white; border-color:green; border-style:solid; border-width:1px;height:113px;">\
                <table style="border-collapse: separate;padding:10px"><tr style="height:70px;">\
                    <td><div id="gkr-hover-img"/></td>\
                    <td><div style="padding-left:10px;">\
                        <div style="height:24px"><a href="javascript:void(0);" id="gkr-hover-link" style="color: rgb(0, 102, 153);";/></div>\
                        <input type="text" placeholder="添加备注" id="gkr-hover-notes" style="width:160px;height:20px;" value=""/>\
                    </div></td></tr>\
                    <tr><td style="width:140px; vertical-align:bottom;"><a id="gkr-hover-msg" href="javascript:void(0);" title="点击发送站内信给他">站内信</a></td>\
                    <td style="width:40px;">\
                    <a id="gkr-hover-block" style="float:right;margin-right:0px;margin-left:10px;" class="mw_btn-ext" href="javascript:void(0);">屏蔽</a>\
                    <!--<a id="gkr-hover-follow" style="float:right;" class="mw_btn-ext" href="javascript:void(0);">关注</a>--></td>\
                    </tr>\
                    </table>\
                </div>\
                <div style="background-color:transparent;height:7px"/>\
            </div>'
            ).hover(function(){
                clearTimeout(outTimer);
                $(this).show();
            },function(){
                var box = $(this);
                clearTimeout(hoverTimer);
                outTimer = setTimeout(function(){
                    box.fadeOut("fast");
                },800);
            }).appendTo($(document.body).children(".container"));
        }

        
        //备注改变事件
        $("#gkr-hover-notes").change(function(){
            var notes = json2obj(store("gkr-user-notes"));
            notes[$("#gkr-hover-box").data("userId")] = $(this).val();
            store("gkr-user-notes",obj2json(notes));
        });
        
        
        //屏蔽按钮事件
        $("#gkr-hover-block").click(function(){
            if (confirm("确定要屏蔽该用户发言？")) {
                addBlocked("ids", $("#gkr-hover-box").data("userId"));
                initBlockList();
            }
        });
        
        //站内信按钮事件
        $("#gkr-hover-msg").click(function(){
            if($(this).data("running") == "true"){return;}
            var msg = $(this).data("running","true");
            window.open("/user/messages/" + $("#gkr-hover-box").data("userId") + "/");
            msg.data("running","false");         
        });

        //表情悬浮框
        $('<div id="gkr-faces-box" style="font-size:12px;display:none;position:absolute;width:310px;z-index:9999;">\
            <s id="gkr-faces-triangle" class="triangle" style="border-width: 8px;border-color:#2AA4CE transparent transparent transparent; border-style:solid dashed dashed dashed;position: absolute;left: 20px;top: 164px;"/>\
            <div id="gkr-faces-div" style="background-color:white; border-color:#2AA4CE; border-style:solid; border-width:1px;padding:0px;width:310px;">\
                <ul id="gkr-faces-groups-ul" style="height: 22px;border-width:1px;border-style:none none solid none;border-color:transparent transparent #2AA4CE transparent;"/>\
                <ul id="gkr-faces-ul"/>\
            </div>\
        </div>'
        ).appendTo($(document.body).children(".container"));
        
        //表情预览悬浮框
        $('<div id="gkr-preview-box" style="display:none;position:absolute;height:64px;width:64px;z-index:9999;">\
            <div id="gkr-preview-div" style="background-color:white;background-size:64px 64px;background-position:0px 0px; border-color:#2AA4CE; border-style:solid; border-width:1px;padding:0px;height:64px;width:64px;"/>\
        </div>'
        ).appendTo($(document.body).children(".container"));
        
        //颜色选择器悬浮框
        $('<div id="gkr-color-box" style="position:absolute; display:none; width:185px; height:160px;z-index:9999;">\
            <s id="gkr-color-triangle" class="triangle" style="border-width: 8px;border-color:#2AA4CE transparent transparent transparent; border-style:solid dashed dashed dashed;position: absolute;left: 20px;top: 145px;"/>\
            <div id="gkr-color-div" style="background-color:white; border-color:#2AA4CE; border-style:solid; border-width:1px;height:143px;"/>\
            <div style="background-color:transparent;height:7px"/>\
        </div>'
        ).appendTo($(document.body).children(".container"));
        
        //小组菜单悬浮框
        $('<div id="gkr-groups-menu" style="font-size:12px;display:none;position:absolute;width:330px;z-index:9999;">\
            <s id="gkr-groups-triangle" class="triangle" style="border-width: 8px;border-color:transparent transparent #85c155 transparent; border-style:dashed dashed solid dashed;position: absolute;left: 160px;top: -15px;"/>\
            <div id="gkr-groups-div" style="background-color:white; border-color:#85c155; border-style:solid; border-width:1px;padding:2px;width:310px;">\
               <ul id="gkr-groups-searchfav-ul" style="height: 22px;border-width:1px;border-style:none none solid none;border-color:transparent transparent #85c155 transparent;">\
                   <li style="float:left;width:95px;height:22px;">\
                   <input type="text" id="gkr-groups-searchbox" placeholder="快速搜索" style="width:90px;"/>\
                   </li>\
               </ul>\
               <ul id="gkr-groups-ul"/>\
            </div>\
        </div>'  
        ).hover(function(){
            clearTimeout(showGroupTimer);
        },function(){
            showGroupTimer = setTimeout(function(){
                $("#gkr-groups-menu").show().hide();
            },400);
        }).appendTo($(document.body).children(".container"));
        
        //追加小组菜单
        $("ul.gh-nav a[href='http://www.guokr.com/group/user/recent_replies/']").hover(function(){
            clearTimeout(showGroupTimer);
            var groupLink = $(this);
            var rowLength = 5;
            var groups = $("#gkr-groups-ul").children().length;
            var grouprows = (groups/rowLength > (parseInt(groups/rowLength,10))) ? (parseInt(groups/rowLength,10) + 1) : (parseInt(groups/rowLength,10));
            $("#gkr-groups-menu").show().css("width",(rowLength * 95) + 2)
            .css("top",groupLink.offset().top + groupLink.height() + 23)
            .css("left",groupLink.offset().left - 145);//首页位置修正
            //.children("#gkr-groups-triangle").css("left",100-70+3).css("top",grouprows*22 + 22);
            $("#gkr-groups-div").css("width",(rowLength * 95) + 5)
            $("#gkr-groups-ul").css("height",grouprows*22 +5);
            $("#gkr-groups-searchfav-ul").css("height",1*22);
        },function(){
            showGroupTimer = setTimeout(function(){
                $("#gkr-groups-menu").show().hide();
            },400);
        });
        
        var maxGroupName = 12;
        //快速搜索
        $("#gkr-groups-searchbox").attr('maxlength',maxGroupName) // 输入框最大输入大小限制在12内
            .keyup(function(){
            var searchText = $(this).val().toLowerCase();
            var reg = new RegExp("^" + searchText);
            $("#gkr-groups-ul").children().each(function(i,n){
                var pyLetters = $(n).attr("pinyin");
                var pyLettersLower = pyLetters.toLowerCase();
                var shortLetters = pyLetters.replace(/[a-z]+/g,"").toLowerCase();
                var fullName = $(n).children("a").attr("title").toLowerCase();
                if(!reg.test(pyLettersLower) && !reg.test(shortLetters) && !reg.test(fullName)){
                    $(n).hide();
                }else{
                    $(n).show();
                }
            });
        });
       
         //还有收藏小组没做TODO
        
        //获取selfHomepage
        selfHomepage = $(".gheader-new a[href^='http://www.guokr.com/i/']").attr("href");
        
        //获取全部小组
        getGroups(function(data){
            $.each(data,function(i,n){
                    var groupName = n;
                    if(groupName.length > maxGroupName ){
                        groupName = groupName.substr(0,maxGroupName - 1) + "…";
                    }
                    $("<li style='float:left;width:95px;height:22px;' pinyin='" + Pinyin.get(n.replace(/\s|\d|!/g,"")) + "'><a href='" + i + "' title='"+ n +"'>" + groupName + "</a></li>")
                        .appendTo("#gkr-groups-ul");
            });
        });
        
        //主处理
        domChanged();
        document.addEventListener("DOMNodeInserted",domChangeRunOnce,false);
        
        //短时间800ms内多次事件发生只执行一次
        function domChangeRunOnce(){
            if(willRun){return;}
            willRun = true;
            runOnceTimer = setTimeout(domChanged,800);
        }
        
        //主处理
        function domChanged() {
            willRun = false;
            log("domChanged");
            //主过滤处理
            var strsPlus = store("strs").split(",").concat(strs);
            var idsPlus = store("ids").split(",").concat(ids);
            $(".container").find("li a,dd a,li * a,dd * a,dl * a").filter(":visible").each(function(){
                var a = $(this);
                var text = a.text();
                $.each(strsPlus,function(i,n){if(n && text.indexOf(n) != -1){a.closest("li,dd,dl").hide();return false;}});
                var href = a.attr("href");
                if(href && a.parent().attr("class") != "titles-b-r"){//最后回复者不作为过滤条件
                    var id = href.replace("http://www.guokr.com/i/","").replace(/\//g,"");
                    if(id && $.inArray(id,idsPlus) != -1){a.closest("li,dd,dl").hide();}
                }
            });
            
            //悬浮框
            $("a[href^='http://www.guokr.com/i/']").children("img[hoverBoxAdded!='true']").attr("hoverBoxAdded","true").hover(function(){
                var img = $(this);
                var parent = $(this).parent();
                clearTimeout(outTimer);
                hoverTimer = setTimeout(function(){
                    var id = parent.attr("href").toString().replace("http://www.guokr.com/i/","").replace(/\//g,"");
                    $("#gkr-hover-box").hide().data("userId",id);
                    $("#gkr-hover-link").attr("href",parent.attr("href")).html(parent.text()+parent.attr("title"));
                    $("#gkr-hover-link:empty").html(parent.next(".lu_txt").text() + $(".post_user").text());
                    $("#gkr-hover-img").empty().append(img.clone().css("height","48px").css("width","48px"));
                    var note = json2obj(store("gkr-user-notes"))[id];
                    $("#gkr-hover-notes").val(note ? note : "");//FF,Chrome不处理undefined
                    $("#gkr-hover-box:hidden").css("top",img.offset().top-120).css("left",img.offset().left).fadeIn("fast").children("#gkr-hover-triangle").css("left",img.attr("width")/2-6);
                },800);
            },function(){
                clearTimeout(hoverTimer);
                outTimer = setTimeout(function(){
                    $("#gkr-hover-box:visible").fadeOut("fast");
                },800);
            });

            //功能按钮
            if($("div.edui-toolbar[addFaceDone!='true']").length > 0){
                var toolBar = $($("div.edui-toolbar[addFaceDone!='true']")[0]);
                
                //颜色选择器
                var cp = "http://img1.guokr.com/gkimage/3u/wh/1y/3uwh1y.gif";
                var cpButton = $("<div tabIndex='998' class='edui-box edui-button'><div class='edui-box edui-icon' style='background-position: 3px 3px;background-repeat: no-repeat;background-size: 20px 20px;'></div></div>");
                //tabIndex属性帮助div获取焦点,处理foucs blur事件                 
                cpButton.children().css("background-image","url('" + cp + "')");
                
                cpButton.click(function(){
                    var cpLink = $(this);
                    //关闭其他悬浮框
                    $("#gkr-faces-box").hide()
                    
                    if($("#gkr-color-div:empty").length > 0){
                        $.each(colors,function(i,n){
                            $("#gkr-color-div").append($("<a href='javascript:void(0);' style='display:block;float: left;height: 20px; width: 20px;background-position:0px 0px;' />").css("background-color","#" + n).click(function(){addColor(n);}));
                        });
                    }
                    try{cpLink.focus();}catch(e){}
                    clearTimeout(hideFaceTimer);
                    
                    //默认情况
                    var top = cpLink.offset().top - 159;
                    var triangleTop = 145;
                    var trangleShape = {"border-color":"#2AA4CE transparent transparent transparent", "border-style":"solid dashed dashed dashed"}//down
                    if($(".edui-editor").offset().left < 10){//编辑器全屏
                        top = cpLink.offset().top + 40;
                        triangleTop = -16;
                        trangleShape = {"border-color":"transparent transparent #2AA4CE transparent", "border-style":"dashed dashed solid dashed"}//up
                    }
                    
                    $("#gkr-color-box").css("top",top)
                    .css("left",cpLink.offset().left - 180 + 62).show()
                    .children("#gkr-color-triangle")
                    .css("left",180-60+3)
                    .css("top",triangleTop)
                    .css(trangleShape);
                    }).blur(function(){
                        hideFaceTimer = setTimeout(function(){$("#gkr-color-box").hide();},500);
                    });
                toolBar.append(cpButton);
                
                //加入更多表情
                var moreFace = "http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/eb/smile.gif";
                var moreFaceButton = $("<div tabIndex='999' class='edui-box edui-button'><div class='edui-box edui-icon' style='background-position: 2px 2px;background-repeat: no-repeat;'></div></div>");
                //tabIndex属性帮助div获取焦点,处理foucs blur事件
                moreFaceButton.children().css("background-image","url('" + moreFace + "')");
                moreFaceButton.click(function(){
                    var morefaceLink = $(this);
                    //关闭其他悬浮框
                    $("#gkr-color-box").hide();
                    $("#gkr-faces-ul").empty();
                    if($("#gkr-faces-ul:empty").length > 0){
                        moreFaces = defaultMoreFaces[0].faces;
                        $.each(moreFaces,function(i,n){
                            $("#gkr-faces-ul").append($("<li style='line-height:22px;height:22px;width:22px;padding:0px;float: left;'>").append(
                                $("<a href='javascript:void(0);' style='display:block;float: left;height: 22px; width: 22px;background-size:22px 22px;background-position:1px 0px;' />")
                                .css("background-image","url('" + $.trim(n) + "')")
                                .click(function(){addFace($.trim(n));})
                                .hover(function(){showPreview(n,this);},function(){hidePreview();})
                            ));
                        });
                    }
                    try{morefaceLink.focus();}catch(e){}//Chrome需要调用focus()获取焦点,FF调用反而会抛出异常
                    clearTimeout(hideFaceTimer);//Chrome重复点击更多表情时取消上次的blur事件
                    var rowLength = 14;
                    var facerows = (moreFaces.length/rowLength > (parseInt(moreFaces.length/rowLength,10))) ? (parseInt(moreFaces.length/rowLength,10) + 1) : (parseInt(moreFaces.length/rowLength,10));

                    //默认情况
                    var top = morefaceLink.offset().top - facerows*22 - 36 - 22;
                    var triangleTop = facerows*22 + 44;
                    var trangleShape = {"border-color":"#2AA4CE transparent transparent transparent", "border-style":"solid dashed dashed dashed"}//down
                    if($(".edui-editor").offset().left < 10){//编辑器全屏
                        top = morefaceLink.offset().top + 40;
                        triangleTop = -16;
                        trangleShape = {"border-color":"transparent transparent #2AA4CE transparent", "border-style":"dashed dashed solid dashed"}//up
                    }
                    $("#gkr-faces-div").css("width",(rowLength * 22) + 2);
                    $("#gkr-faces-box").show().css("width",(rowLength * 22) + 2)
                    .css("top",top)
                    .css("left",morefaceLink.offset().left - 210 + 70)
                    .children("#gkr-faces-triangle").css("left",210-70+5)
                    .css("top",triangleTop)
                    .css(trangleShape);
                    
                    $("#gkr-faces-ul").css("height",facerows*22 +20);
                    $("#gkr-faces-groups-ul").show();
                }).blur(function(){
                    hideFaceTimer = setTimeout(function(){$("#gkr-faces-box").hide();},500);
                }).hover(function(){//常用表情
                    var morefaceLink = $(this);
                    //200ms延迟显示
                    showFaceTimer = setTimeout(function(){
                        //如果更多表情已经显示则不再显示常用表情
                        if($("#gkr-faces-box:visible").length > 0){return;}
                        //关闭其他悬浮框
                        $("#gkr-color-box").hide();
                        $("#gkr-faces-ul").empty();
                        if($("#gkr-faces-ul:empty").length > 0){
                            $.each(faces,function(i,n){
                                    $("#gkr-faces-ul").append($("<li style='line-height:22px;height:22px;width:22px;padding:0px;float: left;'>").append($("<a href='javascript:void(0);' style='display:block;float: left;height: 22px; width: 22px;background-size:22px 22px;background-position:1px 0px;' />").css("background-image","url('" + $.trim(n) + "')").click(function(){addFace($.trim(n));})));
                            });
                        }
                        try{morefaceLink.focus();}catch(e){}//Chrome需要调用focus()获取焦点,FF调用反而会抛出异常
                        clearTimeout(hideFaceTimer);//Chrome重复点击更多表情时取消上次的blur事件
                        var rowLength = 4;
                        var facerows = (faces.length/rowLength > (parseInt(faces.length/rowLength,10))) ? (parseInt(faces.length/rowLength,10) + 1) : (parseInt(faces.length/rowLength,10));
                        
                        
                        //默认情况
                        var top = morefaceLink.offset().top - facerows*22 - 36;
                        var triangleTop = facerows*22 + 22;
                        var trangleShape = {"border-color":"#2AA4CE transparent transparent transparent", "border-style":"solid dashed dashed dashed"}//down
                        if($(".edui-editor").offset().left < 10){//编辑器全屏
                            top = morefaceLink.offset().top + 40;
                            triangleTop = -16;
                            trangleShape = {"border-color":"transparent transparent #2AA4CE transparent", "border-style":"dashed dashed solid dashed"}//up
                        }
                        
                        $("#gkr-faces-div").css("width",(rowLength * 22) + 2);
                        $("#gkr-faces-box").show().css("width",(rowLength * 22) + 2)
                        .css("top",top)
                        .css("left",morefaceLink.offset().left - 100 + 70)
                        .children("#gkr-faces-triangle").css("left",100-70+5)
                        .css("top",triangleTop)
                        .css(trangleShape);
                        $("#gkr-faces-ul").css("height",facerows*22 +20)
                        $("#gkr-faces-groups-ul").hide();
                        },200);
                    },function(){
                        clearTimeout(showFaceTimer);
                    }
                );
                toolBar.append(moreFaceButton);
                
                //表情分组与切换
                $.each(defaultMoreFaces,function(i,n){
                    $("#gkr-faces-groups-ul").append($("<li style='line-height:22px;height:22px;padding:0px 2px 0px 2px;float: left;'></li>").append($("<a index='" + i + "' href='javascript:void(0);'>"+ n.name +"</a>").click(function(){
                        var index = parseInt($(this).attr("index"),10);
                        
                        
                        moreFaces = defaultMoreFaces[index].faces;
                        $("#gkr-faces-ul").empty();
                        if($("#gkr-faces-ul:empty").length > 0){
                            $.each(moreFaces,function(i,n){
                                $("#gkr-faces-ul").append($("<li style='line-height:22px;height:22px;width:22px;padding:0px;float: left;'>").append(
                                    $("<a href='javascript:void(0);' style='display:block;float: left;height: 22px; width: 22px;background-size:22px 22px;background-position:1px 0px;' />")
                                    .css("background-image","url('" + $.trim(n) + "')")
                                    .click(function(){addFace($.trim(n));})
                                    .hover(function(){showPreview(n,this);},function(){hidePreview();})
                                ));
                            });
                        }
                        try{moreFaceButton.focus();}catch(e){}//Chrome需要调用focus()获取焦点,FF调用反而会抛出异常
                        clearTimeout(hideFaceTimer);//Chrome重复点击更多表情时取消上次的blur事件
                        var rowLength = 14;
                        var facerows = (moreFaces.length/rowLength > (parseInt(moreFaces.length/rowLength,10))) ? (parseInt(moreFaces.length/rowLength,10) + 1) : (parseInt(moreFaces.length/rowLength,10));
                        $("#gkr-faces-div").css("width",(rowLength * 22) + 2);
                        
                        //默认情况
                        var top = moreFaceButton.offset().top - facerows*22 - 36 - 22;
                        var triangleTop = facerows*22 + 44;
                        var trangleShape = {"border-color":"#2AA4CE transparent transparent transparent", "border-style":"solid dashed dashed dashed"}//down
                        if($(".edui-editor").offset().left < 10){//编辑器全屏
                            top = moreFaceButton.offset().top + 40;
                            triangleTop = -16;
                            trangleShape = {"border-color":"transparent transparent #2AA4CE transparent", "border-style":"dashed dashed solid dashed"}//up
                        }
                        
                        $("#gkr-faces-box").show().css("width",(rowLength * 22) + 2)
                        .css("top",top)
                        .css("left",moreFaceButton.offset().left - 210 + 70)
                        .children("#gkr-faces-triangle")
                        .css("left",210-70+3)
                        .css("top",triangleTop)
                        .css(trangleShape);
                        log(facerows*22 +20);
                        $("#gkr-faces-ul").css("height",facerows*22 +20);
                    })));
                });
                
                //显示隐藏表情预览
                function showPreview(url,currentTarget){
                    showPreviewTimer = setTimeout(function(){
                        //计算靠左还是靠右显示预览图
                        var previewDivLeft = $("#gkr-faces-box").offset().left;
                        var currentTargetLeft = $(currentTarget).offset().left;
                        var boxWidth = $("#gkr-faces-box").width();
                        if(currentTargetLeft - previewDivLeft <  (boxWidth/2)){
                            previewDivLeft = previewDivLeft + boxWidth - 64;
                        }
                        $("#gkr-preview-box").show().css("top",$("#gkr-faces-box").offset().top + 23).css("left",previewDivLeft).children("#gkr-preview-div").css("background-image","url('" + $.trim(url) + "')");
                    },400);
                }
                function hidePreview(){
                    clearTimeout(showPreviewTimer);
                    $("#gkr-preview-box").hide();
                }

                
                //短网址用于统计
                toolBar.append($("<div id='countLink' class='edui-box edui-button' style='height:25px;width:0px;border-style:none;border-width:0px;background-size:21px 0px;background-position:2px 2px;color:#CECFCE;' ><div class='edui-box edui-icon' ></div></div>").css("background-image","url('http://goo.gl/IkF5C')"));
                
                //$(".gui-ubb-links").attr("addFaceDone","true");
                toolBar.attr("addFaceDone","true");
                
            }
        }

        //重新绘制屏蔽列表
        function initBlockList() {
            if($("#gk-pl-ids").size() == 0){return;}
            $("#gk-pl-ids").empty();
            var arr = store("ids").split(",");
            $.each(arr,function(i,n){
                    if(n)$("#gk-pl-ids").append($("<li style='float:left'>").html(n).append($("<input type='button' title='取消屏蔽' value='x' style='width:16px'/>").click(function(){removeBlocked("ids", n);initBlockList();})));
            });

            $.each(ids,function(i,n){
                if(n)$("#gk-pl-ids").append($("<li style='float:left'>").html(n));
            });

            var arr = store("strs").split(",");
            $("#gk-pl-strs").empty();
            $.each(arr,function(i,n){
                if(n)$("#gk-pl-strs").append($("<li style='float:left'>").html(n).append($("<input type='button' title='取消屏蔽' value='x' style='width:16px'/>").click(function(){removeBlocked("strs", n);initBlockList();})));
            });

            $.each(strs,function(i,n){
                if(n)$("#gk-pl-strs").append($("<li style='float:left'>").html(n));
            });
        }

        //删除处理
        function removeBlocked(a, s) {
            var arr = store(a).split(",");
            $.each(arr,function(i,n){
                if (n == s) {
                    arr.splice(i, 1);
                    return false;
                }
            });
            store(a, arr);
        }

        //屏蔽处理
        function addBlocked(a, s) {
            if (!s) return;
            var arr = store(a).split(",");
            arr.push(s);
            store(a, arr);
            domChanged();
        }

        //加入表情
        function addFace(url) {
            var $view = getViewObject();
            if($view){
                try{
                    $($view.body).focus();
                    var range = $view.getSelection().getRangeAt(0);
                    range.collapse(false);//行末
                    var image = $("<img class='edui-image'>").attr("src",$.trim(url)).attr("data_ue_src",$.trim(url))[0];
                    range.insertNode(image);
                }catch(e){
                    $view.execCommand("unselect");
                    $view.execCommand("insertImage", !1, $.trim(url))
                }
            }

            $("#gkr-faces-box:visible").hide();
        }
        
        //加入字体颜色
        function addColor(color) {
            var $view = getViewObject();
            if($view){
                $($view.body).focus();
                $view.execCommand("ForeColor", !1, "#" + color)
                //Opera Chrome execCommand 改变的字体颜色为font方式,果壳只能解析span方式
                $($view.body).find("font[color]").each(function(){
                    var font = $(this);
                    font.replaceWith($("<span>").css("color",font.attr("color")).html(font.html()));
                });
            }

            $("#gkr-color-box:visible").hide();
        }


        
        
        //获取全部小组
        function getGroups(callback){
            var groups = json2obj(store("gkr-user-groups"));
            var size = 0;
            $.each(groups,function(){size++;});
            var time = new Date().getTime();
            var lastcheck = store("gkr-user-groups-chktime") ? store("gkr-user-groups-chktime"): 0;

            //存在且更新时间在1小时以内则使用既有groups
            if(size > 0 && (time - lastcheck) < 3600000){callback(groups);return;} 

            //否则获取并保存
            if(selfHomepage){
                
                function fetchGroups(url){
                    $.get(url, function(data){
                        $(data).find("ul.join-list * div a[href^='http://www.guokr.com/group/']").each(function(){
                            if($(this).attr("title")){
                                groups[$(this).attr("href")] = $(this).attr("title");
                            }
                        });

                        //有多页(翻页最后一项是链接(下一页))
                        if($(data).find("ul.gpages li:last a").text()){
                            fetchGroups($(data).find("ul.gpages li:last").prev().children("a").attr("href"));
                        }else{
                            store("gkr-user-groups",obj2json(groups));
                            store("gkr-user-groups-chktime",time);
                            callback(groups);
                        }
                    });
                }
                groups = new Object();
                fetchGroups(selfHomepage + "groups/");
            }
        }
        
        //获取可视化模式文本区域
        function getViewObject(){
            var iframe = $(".edui-editor iframe:visible");
            if(iframe.length == 0){return null;}
            return iframe.attr("contentDocument");
        }


    }
})();