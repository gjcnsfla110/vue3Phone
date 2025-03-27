import {defineStore} from 'pinia';

const specData = defineStore('specData',()=>{

    //cpu데이터
    const cpu = [
        {
            name:'Iphone',
            child:[
                {
                    name:'A13',
                    child:[]
                },
                {
                    name:'A14',
                    child:[]
                },
                {
                    name:'A15',
                    child:[]
                },
                {
                    name:'A16',
                    child:[]
                },
                {
                    name:'A17_Pro',
                    child:[]
                },
                {
                    name:'A18',
                    child:[]
                },
                {
                    name:'A18_Pro',
                    child:[]
                },
                {
                    name: '电脑处理器_M1',
                    child:[]
                },
                {
                    name: '电脑处理器_M2',
                    child:[]
                },
                {
                    name: '电脑处理器_M4',
                    child:[]
                },
            ]
        },
        {
            name:'三星',
            child:[
                {
                    name: 'Exynos(三星)1280',
                    child:[]
                },
                {
                    name: 'Exynos(三星)1380',
                    child:[]
                },
                {
                    name: 'Exynos(三星)1480',
                    child:[]
                }
            ]
        },
        {
            name:'高通骁龙',
            child:[
                {
                    name: '高通骁龙4系列',
                    child: []
                },
                {
                    name: '高通骁龙6系列',
                    child: []
                },
                {
                    name: '高通骁龙750G',
                    child: []
                },
                {
                    name: '高通骁龙778G',
                    child: []
                },
                {
                    name: '高通骁龙7Gen1',
                    child: []
                },
                {
                    name: '高通骁龙7Gen2',
                    child: []
                },
                {
                    name: '高通骁龙7+Gen2',
                    child: []
                },
                {
                    name: '高通骁龙860',
                    child: []
                },
                {
                    name: '高通骁龙865',
                    child: []
                },
                {
                    name: '高通骁龙870',
                    child: []
                },
                {
                    name: '高通骁龙888',
                    child: []
                },
                {
                    name: '高通骁龙888+',
                    child: []
                },
                {
                    name: '高通骁龙8+Gen1',
                    child: []
                },
                {
                    name: '高通骁龙8Gen2',
                    child: []
                },
                {
                    name: '高通骁龙8Gen3',
                    child: []
                },
                {
                    name: '高通骁龙8Elite',
                    child: []
                },
            ]
        },
        {
            name:'MediaTek',
            child:[
                {
                    name: 'MediaTek(联发科)-6系列',
                    child: []
                },
                {
                    name: 'MediaTek(联发科)-8200',
                    child: []
                },
                {
                    name: 'MediaTek(联发科)-8300',
                    child: []
                },
                {
                    name: 'MediaTek(联发科)-8400',
                    child: []
                },
                {
                    name: 'MediaTek(联发科)-9200',
                    child: []
                },
                {
                    name: 'MediaTek(联发科)-9300',
                    child: []
                },
                {
                    name: 'MediaTek(联发科)-9400',
                    child: []
                }
            ]
        }
    ];

    //
    const camera = [
        '5000万像素','1亿像素','2亿像素'
    ];

    const ram = [
        '4GB','6GB','8GB','12GB','16GB'
    ];

    const storage = [
        '64GB','128GB','256GB','512GB','1TB'
    ];

    const display = [
        {
            name:'Iphone',
            child:[
                {
                    name:'5.4 英寸',
                    child:[]
                },
                {
                    name:'5.8 英寸',
                    child:[]
                },
                {
                    name:'6.1 英寸',
                    child:[]
                },
                {
                    name:'6.3 英寸',
                    child:[]
                },
                {
                    name:'6.5英寸',
                    child:[]
                },
                {
                    name:'6.7英寸',
                    child:[]
                },
                {
                    name:'6.9英寸',
                    child:[]
                },
            ]
        },
        {
            name:'三星',
            child:[
                {
                    name:'6.1英寸',
                    child:[]
                },
                {
                    name:'6.2英寸',
                    child:[]
                },
                {
                    name:'6.4英寸',
                    child:[]
                },
                {
                    name:'6.5英寸',
                    child:[]
                },
                {
                    name:'6.6英寸',
                    child:[]
                },
                {
                    name:'6.7英寸',
                    child:[]
                },
                {
                    name:'6.8英寸',
                    child:[]
                },
                {
                    name:'正屏6.9英寸-内屏7.4英寸',
                    child:[]
                },
            ]
        }
    ];

    const battery = [
        '3300mAh','3700mAh','4000mAh','4400mAh','4500mAh','4900mAh','5000mAh','5160mAh','5400mAh','5500mAh','5800mAh','5850mAh','6000mAh','6100mAh',
    ];

    const water = [
        '生活防水','IP64','IP65','IP66','IP67','IP68','IP69',
    ];

    const type = [
        '5G网络','4G网络'
    ];

    return {cpu,camera,ram,water,battery,display,storage,type};
})

export default specData;