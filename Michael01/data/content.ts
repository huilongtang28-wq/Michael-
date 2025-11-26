
import { 
  TruckIcon, 
  GlobeAmericasIcon, 
  BuildingOffice2Icon, 
  CubeTransparentIcon 
} from '@heroicons/react/24/outline';

export const CONTACT_INFO = {
  email: "3281443656@qq.com",
  phone: "+86 152 8172 2209",
  phoneLink: "+8615281722209",
  wechat: "m1ke23hl"
};

export const CONTENT = {
  zh: {
    nav: {
      brand: "Michael Tang",
      company: "广州双清国际",
      about: "专业履历",
      services: "解决方案",
      tool: "智能装箱",
      contact: "联系合作"
    },
    hero: {
      tagline: "链接中国与世界的物流桥梁",
      title: "为您构建高效、安全的全球供应链",
      desc: "专注美国、欧洲、印尼双清到门服务。无论是整柜还是拼箱，我们都是您值得信赖的国际物流合作伙伴。",
      cta: "立即咨询方案",
      badge: "广州双清国际货运代理有限公司"
    },
    about: {
      title: "您的全球物流战略伙伴",
      subtitle: "Michael Tang (唐惠龙) - 资深国际物流专家",
      profile: {
        role: "业务经理 / 资深顾问",
        location: "广州番禺 · 宇盛科创园",
        summary: "作为连接中国制造与全球市场的桥梁，Michael 长期致力于为出口工厂及外贸企业提供定制化的物流解决方案。依托广州双清国际的强大平台，他深耕美国、欧洲及东南亚市场，以其专业的业务能力和极强的责任心，帮助无数中国品牌顺利出海。"
      },
      stats: [
        { label: "专注行业", value: "物流+清关" },
        { label: "核心市场", value: "欧美/印尼" },
        { label: "服务客户", value: "工厂/外贸" }
      ],
      features: [
        { title: "工厂合作伙伴", desc: "深知工厂出货痛点，提供从出厂到海外仓的一站式服务。" },
        { title: "外贸企业后盾", desc: "灵活处理各种贸易条款（CIF），助力外贸订单成交。" },
        { title: "全程可视化", desc: "提供透明的物流追踪与即时的沟通反馈，让您时刻安心。" }
      ]
    },
    services: {
      title: "核心物流解决方案",
      subtitle: "精细化运营，覆盖全球核心贸易航线",
      list: [
        { 
          title: "美国双清 DDP", 
          desc: "整柜/拼柜门到门服务，一手价格，极速清关，无惧查验。",
          icon: GlobeAmericasIcon
        },
        { 
          title: "欧洲全境专线", 
          desc: "覆盖欧盟各国，含税包派送，解决VAT与清关难题。",
          icon: TruckIcon
        },
        { 
          title: "印尼海运专家", 
          desc: "印尼整柜与散货霸主，拥有强大的目的港清关与派送网络。",
          icon: BuildingOffice2Icon
        },
        { 
          title: "多式联运方案", 
          desc: "整合海运、空运及小包专线资源，平衡时效与成本。",
          icon: CubeTransparentIcon
        }
      ]
    },
    cases: {
      title: "成功案例",
      list: [
        { 
          tag: "美国专线",
          title: "佛山家具厂 50吨货物 DDP 直送洛杉矶", 
          desc: "为客户规划 2*40HQ 装载方案，优化体积利用率，并成功处理超大件派送难题，节省运费 15%。" 
        },
        { 
          tag: "印尼散货",
          title: "义乌小商品 雅加达极速补货", 
          desc: "针对电商客户的紧急补货需求，采用快船直航模式，12天完成从义乌仓库到雅加达上架的全过程。" 
        }
      ]
    },
    contact: {
      title: "开启合作",
      subtitle: "随时为您提供专业的物流咨询",
      wechat_tip: "点击复制微信号",
      copied: "已复制"
    }
  },
  en: {
    nav: {
      brand: "Michael Tang",
      company: "GZ Shuangqing",
      about: "Profile",
      services: "Solutions",
      tool: "Smart Tool",
      contact: "Contact"
    },
    hero: {
      tagline: "The Bridge Linking China and the World",
      title: "Building Efficient Global Supply Chains",
      desc: "Specializing in USA, Europe, and Indonesia DDP Door-to-Door services. Your trusted partner for FCL & LCL shipments.",
      cta: "Get a Quote",
      badge: "Guangzhou Shuangqing International Freight Forwarding Co., Ltd."
    },
    about: {
      title: "Your Strategic Logistics Partner",
      subtitle: "Michael Tang - Senior Logistics Consultant",
      profile: {
        role: "Business Manager",
        location: "Panyu, Guangzhou",
        summary: "Acting as a vital link between Chinese manufacturing and the global market, Michael provides customized logistics solutions for export factories and trading companies. Backed by Guangzhou Shuangqing International, he leverages deep expertise in US, EU, and Southeast Asian markets to help Chinese brands go global."
      },
      stats: [
        { label: "Industry", value: "Logistics" },
        { label: "Markets", value: "USA/EU/ID" },
        { label: "Clients", value: "B2B/Factory" }
      ],
      features: [
        { title: "Partner for Factories", desc: "One-stop service from factory floor to overseas warehouse." },
        { title: "Backing Traders", desc: "Expert handling of CIF terms to facilitate your trade deals." },
        { title: "Full Visibility", desc: "Transparent tracking and instant communication for your peace of mind." }
      ]
    },
    services: {
      title: "Core Logistics Solutions",
      subtitle: "Specialized operations covering key global trade routes",
      list: [
        { 
          title: "USA DDP Service", 
          desc: "FCL/LCL Door-to-Door. Primary rates, fast clearance, secure delivery.",
          icon: GlobeAmericasIcon
        },
        { 
          title: "Europe Dedicated Line", 
          desc: "Covering EU countries, tax-included delivery, solving VAT & clearance issues.",
          icon: TruckIcon
        },
        { 
          title: "Indonesia Specialist", 
          desc: "Dominant in Indonesia FCL/LCL with powerful destination clearance network.",
          icon: BuildingOffice2Icon
        },
        { 
          title: "Multimodal Transport", 
          desc: "Integrating Sea, Air, and Parcel lines to balance speed and cost.",
          icon: CubeTransparentIcon
        }
      ]
    },
    cases: {
      title: "Success Stories",
      list: [
        { 
          tag: "USA Line",
          title: "Foshan Furniture 50T DDP to LA", 
          desc: "Planned 2*40HQ loading to optimize volume, handled oversized delivery, saving 15% in costs." 
        },
        { 
          tag: "Indonesia LCL",
          title: "Yiwu Commodities to Jakarta", 
          desc: "Express replenishment for e-commerce, completing delivery in 12 days via fast vessel." 
        }
      ]
    },
    cases_items: [
       { 
          tag: "USA Line",
          title: "Foshan Furniture 50T DDP to LA", 
          desc: "Planned 2*40HQ loading to optimize volume, handled oversized delivery, saving 15% in costs." 
        },
        { 
          tag: "Indonesia LCL",
          title: "Yiwu Commodities to Jakarta", 
          desc: "Express replenishment for e-commerce, completing delivery in 12 days via fast vessel." 
        }
    ],
    contact: {
      title: "Let's Connect",
      subtitle: "Ready to provide professional logistics consultation",
      wechat_tip: "Click to copy WeChat ID",
      copied: "Copied"
    }
  }
};
