/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase,
  Moon,
  Sun,
  X,
  Calendar,
  Code,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Copy
} from 'lucide-react';

// --- Types ---
type Section = 'profile' | 'experience' | 'portfolio';

interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  location?: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  date: string;
  timeRange: string;
  image: string;
  renderings?: string[];
  sitePhotos?: string[];
  responsibilities: string;
  status?: string;
}

// --- Mock Data ---
const PORTFOLIO_DATA: PortfolioItem[] = [
  { 
    id: '1', 
    category: '科技馆', 
    title: '未来科技馆', 
    description: '探索前沿科技的沉浸式体验空间。', 
    fullDescription: '未来科技馆是一个集人工智能、量子计算和生物工程于一体的综合性展示空间。该项目通过多媒体互动和VR技术，让观众亲身体验未来科技的魅力。',
    technologies: ['Unity', 'C#', 'Arduino', 'TouchDesigner'],
    date: '2023-10-15',
    timeRange: '2023.01 - 2023.10',
    image: 'https://i.imgs.ovh/2026/02/11/yIQCyL.png',
    responsibilities: '主创设计师，负责整体动线规划与核心展项多媒体方案设计。',
    renderings: ['https://i.imgs.ovh/2026/02/11/yIQCyL.png', 'https://picsum.photos/seed/tech1/800/600'],
    status: '已竣工'
  },
  { 
    id: '1-1', 
    category: '科技馆', 
    title: '长安云—西安科技馆', 
    location: '西安',
    description: '西安市重点科普教育基地。', 
    fullDescription: '长安云—西安科技馆通过先进的展示手段，展示了西安在航空航天、硬科技等领域的卓越成就。项目深度结合了城市文化特色。',
    technologies: ['3ds Max', 'CAD', 'UE5'],
    date: '2024-03-20',
    timeRange: '2023.06 - 2024.03',
    image: 'https://picsum.photos/seed/xian/800/600',
    responsibilities: '负责展厅空间造型设计及后期施工图审核，监督现场工艺还原。',
    sitePhotos: ['https://picsum.photos/seed/xiansite/800/600', 'https://picsum.photos/seed/xiansite2/800/600'],
    renderings: ['https://picsum.photos/seed/xianrender/800/600'],
    status: '已竣工'
  },
  { 
    id: '1-2', 
    category: '科技馆', 
    title: '淮安龙宫海洋世界科普馆', 
    location: '淮安',
    description: '结合地方传说与现代科技的奇幻空间。', 
    fullDescription: '以淮安龙宫文化为核心，利用大型沉浸式投影和机械矩阵，打造出一个科幻与民俗交织的梦幻展示空间。',
    technologies: ['Unity', 'Mechanical Design', 'AE'],
    date: '2023-11-05',
    timeRange: '2023.03 - 2023.11',
    image: 'https://picsum.photos/seed/huaian/800/600',
    responsibilities: '负责多媒体艺术方案策划，指导互动程序逻辑开发，整体效果统筹。',
    renderings: ['https://picsum.photos/seed/huaianrender/800/600'],
    status: '进行中'
  },
  { 
    id: '1-3', 
    category: '科技馆', 
    title: '浙东淡水鱼水族馆', 
    location: '绍兴',
    description: '生态科普与艺术美学的完美融合。', 
    fullDescription: '浙东淡水鱼水族馆展示了丰富的水生生物多样性。设计上强调自然流线与生态材质的运用，营造出治愈系的科普氛围。',
    technologies: ['Landscape Design', 'Aquarium Tech', 'Photoshop'],
    date: '2024-01-15',
    timeRange: '2023.08 - 2024.01',
    image: 'https://picsum.photos/seed/shaoxing/800/600',
    responsibilities: '主笔设计师，负责核心生态展缸造型设计及环境软装选型。',
    renderings: ['https://picsum.photos/seed/sxrender/800/600'],
    status: '已竣工'
  },
  { 
    id: '2', 
    category: '博物馆', 
    title: '中国动漫博物馆', 
    location: '杭州',
    description: '穿越时空的文化遗产展示平台。', 
    fullDescription: '中国动漫博物馆项目通过数字化手段，展示了动漫艺术的独特魅力与科技融合。',
    technologies: ['3ds Max', 'Unreal Engine', 'Photoshop'],
    date: '2023-05-20',
    timeRange: '2022.10 - 2023.05',
    image: 'https://picsum.photos/seed/museum/800/600',
    responsibilities: '负责数字化文物馆展柜设计及全息投影短片的技术指导。'
  },
  { 
    id: '3', 
    category: '企业馆', 
    title: '品牌企业馆', 
    description: '展示企业文化与核心竞争力的窗口。', 
    fullDescription: '为知名科技企业打造的品牌展示馆，通过流线型的空间设计和数据可视化墙，生动展示了企业的发展历程和全球影响力。',
    technologies: ['CAD', 'SketchUp', 'After Effects'],
    date: '2022-12-01',
    timeRange: '2022.07 - 2022.12',
    image: 'https://picsum.photos/seed/corp/800/600',
    responsibilities: '负责企业展厅动线划分、展墙布局及交互数据墙平面设计。'
  },
  { 
    id: '4', 
    category: 'AI作品展示', 
    title: '效果图演示', 
    description: 'AI 辅助生成的高精度室内外效果图。', 
    fullDescription: '利用 Stable Diffusion 与 ControlNet 技术，根据初步草图快速生成高精度的展馆及室内设计方案效果图，极大提升意向对比效率。',
    technologies: ['Stable Diffusion', 'Midjourney', 'ControlNet'],
    date: '2024-03-10',
    timeRange: '2024.02 - 2024.03',
    image: 'https://picsum.photos/seed/ai-render/800/600',
    responsibilities: 'AI 设计流程架构师，负责提示词优化与模型训练调优。'
  },
  { 
    id: '5', 
    category: 'AI作品展示', 
    title: '分析图演示', 
    description: 'AI 辅助生成的空间动线与逻辑分析图。', 
    fullDescription: '利用 AI 工具辅助生成展馆动线图与人流分析图，将抽象逻辑具象化，提升方案汇报的专业度与说服力。',
    technologies: ['Gemini', 'Stable Diffusion', 'Photoshop'],
    date: '2024-03-15',
    timeRange: '2024.03 - 2024.03',
    image: 'https://picsum.photos/seed/ai-analysis/800/600',
    responsibilities: '负责 AI 辅助分析逻辑开发与视觉化呈现。'
  },
  { 
    id: '6', 
    category: 'AI作品展示', 
    title: '彩立面演示', 
    description: 'AI 辅助快速生成的彩色立面图。', 
    fullDescription: '通过 AI 自动填色与材质映射，将线稿立面图快速转化为富有艺术感的彩色立面图，为施工图及方案册提供高质量素材。',
    technologies: ['Stable Diffusion', 'CAD', 'ControlNet'],
    date: '2024-03-20',
    timeRange: '2024.03 - 2024.03',
    image: 'https://picsum.photos/seed/ai-facade/800/600',
    responsibilities: '负责 AI 自动填色流程优化与最终视觉把控。'
  },
];

const CATEGORIES = ['全部', '科技馆', '博物馆', '企业馆', 'AI作品展示'];

// --- Components ---

const BackgroundAnimation = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-20 dark:opacity-10 transition-opacity duration-1000">
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-apple-blue/10 blur-[120px] rounded-full animate-blob" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full animate-blob animation-delay-2000" />
  </div>
);

const ProfileSection = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('872241999@qq.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="space-y-6 pb-4"
    >
      <div className="sleek-card">
        <div className="text-[12px] uppercase text-apple-secondary mb-4 tracking-widest font-bold">基本信息</div>
        <div className="space-y-1">
          <div className="info-item">
            <span className="info-label">出生年月</span>
            <span className="info-value">1992/05/28</span>
          </div>
          <div className="info-item">
            <span className="info-label">户口所在地</span>
            <span className="info-value">黑龙江省鸡西市</span>
          </div>
          <div className="info-item">
            <span className="info-label">现住址</span>
            <span className="info-value">上海市杨浦区</span>
          </div>
          <div className="info-item border-none">
            <span className="info-label">联系方式</span>
            <div className="flex flex-col items-end gap-1">
              <a href="tel:18646352505" className="info-value text-apple-blue hover:underline">186 4635 2505</a>
              <div className="relative">
                <button 
                  onClick={copyEmail}
                  className="text-[13px] text-apple-secondary hover:text-apple-blue transition-colors flex items-center gap-1 group"
                >
                  872241999@qq.com
                  <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <AnimatePresence>
                  {copied && (
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-8 right-0 bg-black text-white text-[10px] px-2 py-1 rounded"
                    >
                      已复制
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sleek-card">
        <div className="text-[12px] uppercase text-apple-secondary mb-3 tracking-widest font-bold">教育背景</div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <h3 className="text-[15px] font-bold">哈尔滨师范大学</h3>
            <span className="text-[11px] bg-apple-blue/10 text-apple-blue px-2 py-0.5 rounded-full font-bold">2011 - 2014</span>
          </div>
          <p className="text-[13px] text-apple-text font-medium mt-1">本科 · 环境艺术设计</p>
          <div className="mt-2 space-y-2">
            <div className="flex gap-2 text-[12px] text-apple-secondary">
              <div className="w-1 h-1 rounded-full bg-apple-blue mt-1.5 shrink-0" />
              <p>获得优秀毕业设计金奖</p>
            </div>
            <div className="flex gap-2 text-[12px] text-apple-secondary">
              <div className="w-1 h-1 rounded-full bg-apple-blue mt-1.5 shrink-0" />
              <p>在校期间收到校领导邀请进入校设计院参与设计工作</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sleek-card">
        <div className="text-[12px] uppercase text-apple-secondary mb-3 tracking-widest font-bold">自我评价</div>
        <div className="space-y-4 text-[14px] leading-relaxed font-medium">
          <div className="flex gap-3">
            <span className="text-apple-blue font-bold text-lg leading-none mt-0.5">•</span>
            <p>具有扎实的展馆，餐饮，办公设计知识。能独立或带领团队完成设计工作、后期可全程住驻场跟进施工。性格开朗乐观，积极肯干，吃苦耐劳。对工作充满激情，全力以赴，敢于创新。</p>
          </div>
          <div className="flex gap-3">
            <span className="text-apple-blue font-bold text-lg leading-none mt-0.5">•</span>
            <p>熟练使用3Dmax，CAD，Photoshop。精通多种渲染器，如：Vray、Chaos Vantage。可以根据项目时间节点灵活切换，极大的缩短项目制作周期。</p>
          </div>
          <div className="flex gap-3">
            <span className="text-apple-blue font-bold text-lg leading-none mt-0.5">•</span>
            <p>对AI学习热情度极高，精通Gemini、Google AI studio、Stable Diffusion（Web ui），用Gemini制作了诸多智能体，用Google AI studio自研了一系列可以提高工作效率的程序，可以把AI完美的融入工作流程中，提高工作效率也提升工作质量。</p>
          </div>
        </div>
      </div>

      <div className="sleek-card">
        <div className="text-[12px] uppercase text-apple-secondary mb-4 tracking-widest font-bold">重点完成项目概览</div>
        <div className="space-y-4">
          {[
            { name: "浙东淡水鱼水族馆", location: "绍兴", role: "主创设计", detail: "全程施工跟进", status: "已竣工", link: "https://sxwg.sx.gov.cn/art/2024/9/5/art_1647997_59016450.html" },
            { name: "长安云—西安科技馆", location: "西安", role: "主创设计", detail: "全程施工跟进", status: "已竣工", link: "https://baike.baidu.com/item/%E9%95%BF%E5%AE%89%E4%BA%91%E2%80%94%E8%A5%BF%E5%AE%89%E7%A7%91%E6%8A%80%E9%A6%86/66707648?fromtitle=%E8%A5%BF%E5%AE%89%E7%A7%91%E6%8A%80%E9%A6%86&fromid=66728489&fr=aladdin" },
            { name: "淮安龙宫海洋世界科普馆", location: "淮安", role: "主创设计", detail: "全程施工跟进", status: "已竣工", link: "https://baijiahao.baidu.com/s?id=1860714315712335288&wfr=spider&for=pc" },
            { name: "中国动漫博物馆", location: "杭州", role: "空间设计", detail: "中国国际空间设计大赛银奖", status: "已竣工", link: "https://baike.baidu.com/item/%E4%B8%AD%E5%9B%BD%E5%8A%A8%E6%BC%AB%E5%8D%9A%E7%89%A9%E9%A6%86/3114992" },
          ].map((proj, idx) => (
            <div key={idx} className="flex flex-col gap-1 border-b border-gray-100 pb-3 last:border-none last:pb-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[15px]">{proj.name}</h4>
                  <span className="text-[10px] text-apple-secondary bg-gray-100 px-1.5 py-0.5 rounded uppercase">{proj.location}</span>
                </div>
                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-apple-blue flex items-center gap-1.5 hover:opacity-70 transition-opacity">
                  <span className="text-[12px] font-bold">项目链接</span>
                  <ExternalLink size={14} />
                </a>
              </div>
              <div className="flex flex-wrap gap-2 text-[12px] text-apple-secondary font-medium">
                <span className="bg-apple-gray px-2 py-0.5 rounded">{proj.role}</span>
                <span className="bg-apple-gray px-2 py-0.5 rounded">{proj.detail}</span>
                <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded">{proj.status}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] text-apple-secondary mt-6 font-medium italic">
          更多项目请与您我联系进行了解...
        </p>
      </div>

      <div className="sleek-card">
        <div className="text-[12px] uppercase text-apple-secondary mb-4 tracking-widest font-bold">专业技能</div>
        <div className="flex flex-wrap gap-1">
          {['3DMAX', 'CAD', 'Photoshop', 'Vray', 'Chaos Vantage', 'Stable Diffusion', 'Gemini', 'Google AI studio'].map((skill) => (
            <span key={skill} className="skill-tag uppercase">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    className="space-y-0 pb-4 relative"
  >
    {/* Timeline Vertical Line */}
    <div className="absolute left-[19px] top-8 bottom-8 w-px bg-apple-blue/20 -z-0" />

    {/* Shanghai Science Dream */}
    <div className="relative pl-10 pb-8">
      <div className="absolute left-4 top-3 w-1.5 h-1.5 rounded-full bg-apple-blue border border-white z-10 shadow-[0_0_0_4px_rgba(0,122,255,0.1)]" />
      <div className="sleek-card">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold">上海科学梦展览展示有限公司</h3>
            <p className="text-apple-blue text-sm font-bold">主案设计师</p>
          </div>
          <span className="text-[11px] bg-apple-blue/10 text-apple-blue px-3 py-1 rounded-full font-bold whitespace-nowrap">2024 - 至今</span>
        </div>
        
        <div className="space-y-3">
          {[
            "前期与策划部门配合，确定主要设计方向，意向图与主题的确定与监督",
            "中期独立设计展馆动线与分区，绘制平面，自己或布置下属制作前期的简模",
            "确定空间内所需材质与多媒体设备，独立制作效果图"
          ].map((desc, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="w-1 h-1 rounded-full bg-apple-blue mt-2 shrink-0 opacity-40" />
              <p className="text-[14px] text-apple-text leading-relaxed font-medium">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Shanghai Chengtang */}
    <div className="relative pl-10 pb-8">
      <div className="absolute left-4 top-3 w-1.5 h-1.5 rounded-full bg-apple-blue border border-white z-10" />
      <div className="sleek-card">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold">上海诚唐展览展示有限公司</h3>
            <p className="text-apple-blue text-sm font-bold">主案设计师</p>
          </div>
          <span className="text-[11px] bg-apple-blue/10 text-apple-blue px-3 py-1 rounded-full font-bold whitespace-nowrap">2020 - 2024</span>
        </div>
        
        <div className="space-y-3">
          {[
            "前期与策划部门配合，确定主要设计方向，意向图与主题的确定与监督",
            "中期独立设计展馆动线与分区，绘制平面，自己或布置下属制作前期的简模",
            "确定空间内所需材质与多媒体设备，独立制作效果图"
          ].map((desc, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="w-1 h-1 rounded-full bg-apple-blue mt-2 shrink-0 opacity-40" />
              <p className="text-[14px] text-apple-text leading-relaxed font-medium">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Shanghai Vimai */}
    <div className="relative pl-10 pb-8">
      <div className="absolute left-4 top-3 w-1.5 h-1.5 rounded-full bg-apple-blue border border-white z-10" />
      <div className="sleek-card">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold">上海维迈科建集团公司</h3>
            <p className="text-apple-blue text-sm font-bold">主案设计师</p>
          </div>
          <span className="text-[11px] bg-apple-blue/10 text-apple-blue px-3 py-1 rounded-full font-bold whitespace-nowrap">2018 - 2020</span>
        </div>
        
        <div className="space-y-3">
          {[
            "前期与策划部门配合，确定主要设计方向，意向图与主题的确定与监督",
            "中期独立设计展馆动线与分区，绘制平面，自己或布置下属制作前期的简模",
            "确定空间内所需材质与多媒体设备，独立制作效果图",
            "方案汇报。与预算部门和施工图部门配合"
          ].map((desc, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="w-1 h-1 rounded-full bg-apple-blue mt-2 shrink-0 opacity-40" />
              <p className="text-[14px] text-apple-text leading-relaxed font-medium">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Transition Note 1 */}
    <div className="relative pl-10 pb-4 -mt-4 opacity-60">
      <div className="flex items-center gap-2 text-[11px] font-bold text-apple-blue tracking-widest uppercase py-2">
        <div className="h-px bg-apple-blue/20 flex-1" />
        转型展馆设计
        <div className="h-px bg-apple-blue/20 flex-1" />
      </div>
    </div>

    {/* Shanghai Quanzhuyi */}
    <div className="relative pl-10 pb-8">
      <div className="absolute left-4 top-3 w-1.5 h-1.5 rounded-full bg-apple-blue border border-white z-10" />
      <div className="sleek-card">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold">上海全筑易股份有限公司</h3>
            <p className="text-apple-blue text-sm font-bold">空间设计师</p>
          </div>
          <span className="text-[11px] bg-apple-blue/10 text-apple-blue px-3 py-1 rounded-full font-bold whitespace-nowrap">2016 - 2018</span>
        </div>
        
        <div className="space-y-3">
          {[
            "主要负责部分前期尺寸测量，空间设计，所有项目的效果图制作与后期",
            "辅助参与施工图制作",
            "辅助方案汇报工作"
          ].map((desc, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="w-1 h-1 rounded-full bg-apple-blue mt-2 shrink-0 opacity-40" />
              <p className="text-[14px] text-apple-text leading-relaxed font-medium">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Transition Note 2 */}
    <div className="relative pl-10 pb-4 -mt-4 opacity-60">
      <div className="flex items-center gap-2 text-[11px] font-bold text-apple-blue tracking-widest uppercase py-2">
        <div className="h-px bg-apple-blue/20 flex-1" />
        来到上海发展
        <div className="h-px bg-apple-blue/20 flex-1" />
      </div>
    </div>

    {/* Harbin Normal University */}
    <div className="relative pl-10 pb-2">
      <div className="absolute left-4 top-3 w-1.5 h-1.5 rounded-full bg-apple-blue border border-white z-10 shadow-sm" />
      <div className="sleek-card">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-base font-bold">哈尔滨师范大学校设计院（公共空间）</h3>
            <p className="text-apple-blue text-sm font-bold">空间设计师</p>
          </div>
          <span className="text-[11px] bg-apple-blue/10 text-apple-blue px-3 py-1 rounded-full font-bold whitespace-nowrap">2013 - 2016</span>
        </div>
        
        <div className="space-y-3">
          {[
            "主要负责设计，效果图制作以及部分施工图制作，每一套项目的量尺，偶尔与甲方直接沟通设计",
            "参与设计与制作项目 20 余套，大部分采纳并施工完成",
            "代表作品：哈师大中俄油画交易中心，北京宝林东北菜，哈尔滨巴彦部落主题烧烤等"
          ].map((desc, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="w-1 h-1 rounded-full bg-apple-blue mt-2 shrink-0 opacity-40" />
              <p className="text-[14px] text-apple-text leading-relaxed font-medium">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const PortfolioSection = ({ onSelectItem }: { onSelectItem: (item: PortfolioItem) => void }) => {
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredItems = activeCategory === '全部' 
    ? PORTFOLIO_DATA 
    : PORTFOLIO_DATA.filter(item => item.category === activeCategory);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="space-y-6"
    >
      <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all whitespace-nowrap ${
              activeCategory === cat 
                ? 'bg-apple-blue text-white shadow-sm' 
                : 'bg-[#eeeeef] text-apple-secondary hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => onSelectItem(item)}
              className="portfolio-item-sleek group cursor-pointer"
            >
              <div className="relative h-24 sm:h-32">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-3 bg-white">
                <div className="font-bold text-[13px] text-apple-text tracking-tight truncate">{item.title}</div>
                <div className="text-[10px] text-apple-secondary uppercase font-bold tracking-widest mt-0.5">{item.category}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ProjectDetail = ({ item, onClose }: { item: PortfolioItem, onClose: () => void }) => {
  // Category-specific styles
  const getCategoryColor = () => {
    switch (item.category) {
      case '科技馆': return 'bg-blue-500';
      case '博物馆': return 'bg-amber-600';
      case '企业馆': return 'bg-purple-600';
      case '规划馆': return 'bg-emerald-600';
      default: return 'bg-apple-blue';
    }
  };

  return (
    <motion.div 
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-50 bg-[#fbfbfb] flex flex-col"
    >
      {/* Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-gray-100 glass sticky top-0 z-10">
        <button onClick={onClose} className="flex items-center gap-1.5 text-apple-blue font-semibold text-[15px]">
          <ArrowLeft size={20} /> 返回
        </button>
        <span className="text-[15px] font-bold tracking-tight">项目详情</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-12">
        {/* Main Hero Image */}
        <div className="relative h-72 sm:h-96">
          <img 
            src={item.image} 
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 space-y-2">
            <div className={`inline-block px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest ${getCategoryColor()}`}>
              {item.category} {item.status && `· ${item.status}`}
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">{item.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-xl mx-auto px-6 py-8 space-y-10">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-6 py-6 border-y border-gray-100">
            <div className="space-y-1">
              <span className="text-[11px] text-apple-secondary uppercase font-bold tracking-widest">项目区间</span>
              <p className="text-[14px] font-medium">{item.timeRange}</p>
            </div>
            <div className="space-y-1 text-right">
              <span className="text-[11px] text-apple-secondary uppercase font-bold tracking-widest">发布日期</span>
              <p className="text-[14px] font-medium">{item.date}</p>
            </div>
          </div>

          {/* Project Introduction */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight">项目介绍</h3>
            <p className="text-[15px] text-apple-text leading-relaxed opacity-80 font-medium">
              {item.fullDescription}
            </p>
          </section>

          {/* Responsibilities */}
          <section className="space-y-4 p-5 bg-apple-gray rounded-2xl border border-gray-100">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Briefcase size={20} className="text-apple-blue" /> 职责描述
            </h3>
            <p className="text-[14px] text-apple-text leading-relaxed font-medium">
              {item.responsibilities}
            </p>
          </section>

          {/* Renderings Portfolio */}
          {item.renderings && item.renderings.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                效果图展示 <span className="text-xs font-normal text-apple-secondary tracking-widest uppercase">Renderings</span>
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {item.renderings.map((img, idx) => (
                  <div key={idx} className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <img src={img} alt={`Render ${idx+1}`} className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Site Photos (only if completed) */}
          {item.status === '已竣工' && item.sitePhotos && item.sitePhotos.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                现场照片 <span className="text-xs font-normal text-apple-secondary tracking-widest uppercase">Site Photos</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {item.sitePhotos.map((img, idx) => (
                  <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-gray-100">
                    <img src={img} alt={`Site ${idx+1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technology Stack */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 tracking-tight">
              <Code size={18} className="text-apple-blue" /> 技术应用
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.technologies.map(tech => (
                <span key={tech} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-[13px] font-semibold shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('profile');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return <ProfileSection />;
      case 'experience': return <ExperienceSection />;
      case 'portfolio': return <PortfolioSection onSelectItem={setSelectedItem} />;
    }
  };

  const navItems = [
    { id: 'profile', label: '资料' },
    { id: 'experience', label: '经验' },
    { id: 'portfolio', label: '作品' },
  ];

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-apple-text transition-colors duration-500 pb-24">
      <BackgroundAnimation />

      {/* Header */}
      <header className="sticky top-0 z-40 glass px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-apple-blue shadow-sm shrink-0 bg-apple-gray">
             <img 
               src="https://picsum.photos/seed/portrait/200/200" 
               alt="个人照片" 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight">李钰博</h1>
            <p className="text-[11px] text-apple-secondary font-bold tracking-widest uppercase mt-0.5">
              资深主创设计师 · 33岁
            </p>
          </div>
        </div>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-6 pt-8">
        <div className="mb-8">
          <motion.h2 
            key={activeSection}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold tracking-tight"
          >
            {activeSection === 'profile' && '李钰博'}
            {activeSection === 'experience' && '工作经验'}
            {activeSection === 'portfolio' && '作品集'}
          </motion.h2>
          <p className="text-apple-secondary text-sm mt-1">
            资深主创设计师 · 33岁
          </p>
          <p className="text-apple-secondary text-[13px] mt-4 leading-relaxed font-medium max-w-lg">
            您好！感谢您拨冗查阅我的简历，您可以在底部切换查看我的资料、经验以及个人作品。静待您的回复，希望能有机会进一步沟通。
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSection}
            className="min-h-[400px]"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Fixed Bottom Style) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-gray-100 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <div className="max-w-xl mx-auto px-4 py-2.5 flex items-center justify-around gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-apple-blue text-white shadow-sm' 
                    : 'text-apple-secondary hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Portfolio Detail Page Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <ProjectDetail 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
