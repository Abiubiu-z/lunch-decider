export type Category =
  | 'chinese'
  | 'western'
  | 'japanese'
  | 'korean'
  | 'southeast_asian'
  | 'fast_food'
  | 'noodles'
  | 'rice'
  | 'light'
  | 'hotpot_bbq'
  | 'snack'
  | 'drink_combo';

export type MenuItem = {
  id: string;
  name: string;
  category: Category;
  tags: string[];
  description?: string;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  chinese: '中餐',
  western: '西餐',
  japanese: '日料',
  korean: '韩餐',
  southeast_asian: '东南亚',
  fast_food: '快餐',
  noodles: '面食',
  rice: '米饭',
  light: '轻食',
  hotpot_bbq: '火锅烧烤',
  snack: '小吃甜品',
  drink_combo: '饮品搭配',
};

export const TAG_LABELS: Record<string, string> = {
  spicy: '辣',
  mild: '不辣',
  meat: '荤',
  veg: '素',
  mixed: '荤素',
  cheap: '实惠',
  mid: '中等',
  expensive: '偏贵',
  solo: '单人',
  group: '聚餐',
  heavy: '重口',
  light_mood: '清淡',
  fast: '快餐',
  treat: '犒劳',
};

function item(
  id: string,
  name: string,
  category: Category,
  tags: string[],
  description?: string
): MenuItem {
  return { id, name, category, tags, description };
}

export const MENU: MenuItem[] = [
  // 中餐 (20)
  item('cn01', '黄焖鸡米饭', 'chinese', ['meat', 'mid', 'solo', 'fast', 'mild']),
  item('cn02', '宫保鸡丁盖饭', 'chinese', ['meat', 'spicy', 'mid', 'solo', 'fast']),
  item('cn03', '鱼香肉丝盖饭', 'chinese', ['meat', 'spicy', 'mid', 'solo', 'fast']),
  item('cn04', '麻婆豆腐盖饭', 'chinese', ['veg', 'spicy', 'cheap', 'solo', 'fast', 'heavy']),
  item('cn05', '番茄炒蛋盖饭', 'chinese', ['mixed', 'mild', 'cheap', 'solo', 'fast', 'light_mood']),
  item('cn06', '红烧肉盖饭', 'chinese', ['meat', 'mild', 'mid', 'solo', 'heavy', 'treat']),
  item('cn07', '青椒肉丝盖饭', 'chinese', ['meat', 'mild', 'cheap', 'solo', 'fast']),
  item('cn08', '回锅肉盖饭', 'chinese', ['meat', 'spicy', 'mid', 'solo', 'heavy']),
  item('cn09', '酸菜鱼套餐', 'chinese', ['meat', 'spicy', 'mid', 'group', 'heavy']),
  item('cn10', '水煮肉片', 'chinese', ['meat', 'spicy', 'mid', 'group', 'heavy']),
  item('cn11', '干锅花菜', 'chinese', ['veg', 'spicy', 'mid', 'group', 'heavy']),
  item('cn12', '蒜蓉西兰花', 'chinese', ['veg', 'mild', 'cheap', 'solo', 'light_mood']),
  item('cn13', '饺子（猪肉白菜）', 'chinese', ['meat', 'mild', 'cheap', 'solo', 'fast']),
  item('cn14', '馄饨', 'chinese', ['meat', 'mild', 'cheap', 'solo', 'fast', 'light_mood']),
  item('cn15', '小笼包', 'chinese', ['meat', 'mild', 'mid', 'solo', 'treat']),
  item('cn16', '煎饼果子', 'chinese', ['mixed', 'mild', 'cheap', 'solo', 'fast']),
  item('cn17', '皮蛋瘦肉粥', 'chinese', ['meat', 'mild', 'cheap', 'solo', 'fast', 'light_mood']),
  item('cn18', '麻辣烫', 'chinese', ['mixed', 'spicy', 'cheap', 'solo', 'heavy', 'fast']),
  item('cn19', '沙县拌面+蒸饺', 'chinese', ['meat', 'mild', 'cheap', 'solo', 'fast']),
  item('cn20', '地三鲜盖饭', 'chinese', ['veg', 'mild', 'cheap', 'solo', 'light_mood']),

  // 西餐 (15)
  item('we01', '经典牛肉汉堡', 'western', ['meat', 'mid', 'solo', 'fast', 'heavy']),
  item('we02', '芝士汉堡套餐', 'western', ['meat', 'mid', 'solo', 'fast', 'treat']),
  item('we03', '玛格丽特披萨', 'western', ['veg', 'mid', 'group', 'treat']),
  item('we04', '意式腊肠披萨', 'western', ['meat', 'mid', 'group', 'heavy']),
  item('we05', '奶油培根意面', 'western', ['meat', 'mid', 'solo', 'treat']),
  item('we06', '番茄肉酱意面', 'western', ['meat', 'mild', 'mid', 'solo']),
  item('we07', '凯撒沙拉', 'western', ['veg', 'mild', 'mid', 'solo', 'light_mood']),
  item('we08', '鸡肉三明治', 'western', ['meat', 'mild', 'cheap', 'solo', 'fast']),
  item('we09', '金枪鱼三明治', 'western', ['meat', 'mild', 'cheap', 'solo', 'fast', 'light_mood']),
  item('we10', '牛排简餐（七分熟）', 'western', ['meat', 'expensive', 'solo', 'treat', 'heavy']),
  item('we11', '烤鸡沙拉碗', 'western', ['meat', 'mid', 'solo', 'light_mood']),
  item('we12', '法式洋葱汤+面包', 'western', ['veg', 'mid', 'solo', 'light_mood']),
  item('we13', '热狗套餐', 'western', ['meat', 'cheap', 'solo', 'fast']),
  item('we14', '海鲜焗饭', 'western', ['meat', 'expensive', 'solo', 'treat']),
  item('we15', '蘑菇浓汤+全麦包', 'western', ['veg', 'mild', 'cheap', 'solo', 'light_mood']),

  // 日料 (15)
  item('jp01', '豚骨拉面', 'japanese', ['meat', 'mid', 'solo', 'heavy']),
  item('jp02', '味噌拉面', 'japanese', ['meat', 'mid', 'solo', 'heavy']),
  item('jp03', '寿司拼盘（8贯）', 'japanese', ['meat', 'expensive', 'solo', 'treat', 'light_mood']),
  item('jp04', '三文鱼刺身饭', 'japanese', ['meat', 'expensive', 'solo', 'treat', 'light_mood']),
  item('jp05', '照烧鸡排定食', 'japanese', ['meat', 'mid', 'solo', 'mild']),
  item('jp06', '炸猪排定食', 'japanese', ['meat', 'mid', 'solo', 'heavy', 'treat']),
  item('jp07', '牛肉饭（牛丼）', 'japanese', ['meat', 'cheap', 'solo', 'fast']),
  item('jp08', '亲子丼', 'japanese', ['meat', 'mid', 'solo', 'mild']),
  item('jp09', '天妇罗乌冬', 'japanese', ['meat', 'mid', 'solo', 'heavy']),
  item('jp10', '鳗鱼饭', 'japanese', ['meat', 'expensive', 'solo', 'treat']),
  item('jp11', '关东煮套餐', 'japanese', ['mixed', 'mild', 'cheap', 'solo', 'light_mood']),
  item('jp12', '日式咖喱饭', 'japanese', ['meat', 'mid', 'solo', 'mild', 'heavy']),
  item('jp13', '章鱼小丸子', 'japanese', ['meat', 'cheap', 'solo', 'fast'], '街头人气小吃'),
  item('jp14', '茶泡饭', 'japanese', ['veg', 'mild', 'cheap', 'solo', 'light_mood', 'fast']),
  item('jp15', '寿喜烧套餐', 'japanese', ['meat', 'expensive', 'group', 'treat']),

  // 韩餐 (12)
  item('kr01', '石锅拌饭', 'korean', ['mixed', 'spicy', 'mid', 'solo', 'heavy']),
  item('kr02', '韩式炸鸡', 'korean', ['meat', 'mid', 'group', 'heavy', 'treat']),
  item('kr03', '部队锅', 'korean', ['meat', 'spicy', 'mid', 'group', 'heavy']),
  item('kr04', '泡菜炒饭', 'korean', ['mixed', 'spicy', 'cheap', 'solo', 'fast']),
  item('kr05', '参鸡汤', 'korean', ['meat', 'expensive', 'solo', 'light_mood', 'treat']),
  item('kr06', '韩式烤五花肉饭', 'korean', ['meat', 'mid', 'solo', 'heavy', 'treat']),
  item('kr07', '冷面', 'korean', ['meat', 'mild', 'mid', 'solo', 'light_mood', 'fast']),
  item('kr08', '炒年糕', 'korean', ['veg', 'spicy', 'cheap', 'solo', 'fast']),
  item('kr09', '海带汤饭', 'korean', ['meat', 'mild', 'cheap', 'solo', 'light_mood']),
  item('kr10', '芝士排骨', 'korean', ['meat', 'expensive', 'group', 'treat', 'heavy']),
  item('kr11', '韩式拌冷面', 'korean', ['veg', 'spicy', 'cheap', 'solo', 'fast']),
  item('kr12', '大酱汤+米饭', 'korean', ['mixed', 'mild', 'cheap', 'solo', 'light_mood']),

  // 东南亚 (12)
  item('sea01', '泰式绿咖喱鸡', 'southeast_asian', ['meat', 'spicy', 'mid', 'solo', 'heavy']),
  item('sea02', '冬阴功汤粉', 'southeast_asian', ['meat', 'spicy', 'mid', 'solo', 'heavy']),
  item('sea03', '越南牛肉河粉', 'southeast_asian', ['meat', 'mid', 'solo', 'light_mood']),
  item('sea04', '海南鸡饭', 'southeast_asian', ['meat', 'mid', 'solo', 'mild']),
  item('sea05', '马来椰浆饭', 'southeast_asian', ['meat', 'mid', 'solo', 'heavy']),
  item('sea06', '印尼炒饭', 'southeast_asian', ['meat', 'spicy', 'cheap', 'solo', 'fast']),
  item('sea07', '新加坡叻沙', 'southeast_asian', ['meat', 'spicy', 'mid', 'solo', 'heavy']),
  item('sea08', '芒果糯米饭', 'southeast_asian', ['veg', 'mid', 'solo', 'treat']),
  item('sea09', '泰式炒河粉', 'southeast_asian', ['meat', 'mid', 'solo', 'fast']),
  item('sea10', '菠萝炒饭', 'southeast_asian', ['meat', 'mid', 'solo', 'treat']),
  item('sea11', '越南春卷', 'southeast_asian', ['meat', 'cheap', 'solo', 'light_mood', 'fast']),
  item('sea12', '沙嗲鸡肉串饭', 'southeast_asian', ['meat', 'mid', 'solo', 'mild']),

  // 快餐 (15)
  item('ff01', '炸鸡套餐', 'fast_food', ['meat', 'mid', 'solo', 'fast', 'heavy']),
  item('ff02', '双层牛肉堡', 'fast_food', ['meat', 'mid', 'solo', 'fast', 'heavy']),
  item('ff03', '鸡米花+薯条', 'fast_food', ['meat', 'cheap', 'solo', 'fast']),
  item('ff04', '原味鸡排饭', 'fast_food', ['meat', 'cheap', 'solo', 'fast']),
  item('ff05', '热辣鸡腿堡', 'fast_food', ['meat', 'spicy', 'mid', 'solo', 'fast']),
  item('ff06', '鱼排堡', 'fast_food', ['meat', 'mid', 'solo', 'fast', 'mild']),
  item('ff07', '早餐帕尼尼', 'fast_food', ['meat', 'cheap', 'solo', 'fast']),
  item('ff08', '墨西哥鸡肉卷', 'fast_food', ['meat', 'spicy', 'cheap', 'solo', 'fast']),
  item('ff09', '鸡块沙拉盒', 'fast_food', ['meat', 'mid', 'solo', 'light_mood']),
  item('ff10', '照烧鸡腿饭', 'fast_food', ['meat', 'cheap', 'solo', 'fast']),
  item('ff11', '香骨鸡套餐', 'fast_food', ['meat', 'mid', 'solo', 'fast', 'treat']),
  item('ff12', '薯格+可乐套餐', 'fast_food', ['veg', 'cheap', 'solo', 'fast']),
  item('ff13', '培根蛋堡', 'fast_food', ['meat', 'cheap', 'solo', 'fast']),
  item('ff14', '辣味鸡翅桶（小）', 'fast_food', ['meat', 'spicy', 'mid', 'group', 'heavy']),
  item('ff15', '芝士牛肉卷', 'fast_food', ['meat', 'mid', 'solo', 'fast']),

  // 面食 (18)
  item('no01', '兰州牛肉面', 'noodles', ['meat', 'spicy', 'mid', 'solo', 'heavy']),
  item('no02', '重庆小面', 'noodles', ['meat', 'spicy', 'cheap', 'solo', 'heavy', 'fast']),
  item('no03', '刀削面', 'noodles', ['meat', 'mild', 'mid', 'solo']),
  item('no04', '炸酱面', 'noodles', ['meat', 'mild', 'cheap', 'solo', 'fast']),
  item('no05', '热干面', 'noodles', ['veg', 'spicy', 'cheap', 'solo', 'fast', 'heavy']),
  item('no06', '担担面', 'noodles', ['meat', 'spicy', 'mid', 'solo', 'heavy']),
  item('no07', '葱油拌面', 'noodles', ['veg', 'mild', 'cheap', 'solo', 'fast', 'light_mood']),
  item('no08', '花甲粉', 'noodles', ['meat', 'spicy', 'mid', 'solo', 'heavy']),
  item('no09', '酸辣粉', 'noodles', ['veg', 'spicy', 'cheap', 'solo', 'fast', 'heavy']),
  item('no10', '螺蛳粉', 'noodles', ['meat', 'spicy', 'cheap', 'solo', 'heavy']),
  item('no11', '过桥米线', 'noodles', ['meat', 'mid', 'solo', 'mild']),
  item('no12', '炒河粉', 'noodles', ['meat', 'mid', 'solo', 'fast']),
  item('no13', '裤带面', 'noodles', ['veg', 'spicy', 'mid', 'solo', 'heavy']),
  item('no14', '臊子面', 'noodles', ['meat', 'spicy', 'mid', 'solo']),
  item('no15', '云吞面', 'noodles', ['meat', 'mild', 'mid', 'solo', 'light_mood']),
  item('no16', '炒面', 'noodles', ['meat', 'mid', 'solo', 'fast']),
  item('no17', '油泼面', 'noodles', ['veg', 'spicy', 'cheap', 'solo', 'heavy']),
  item('no18', 'biangbiang面', 'noodles', ['veg', 'spicy', 'mid', 'solo', 'heavy']),

  // 米饭 (18)
  item('ri01', '扬州炒饭', 'rice', ['meat', 'mild', 'cheap', 'solo', 'fast']),
  item('ri02', '蛋炒饭', 'rice', ['mixed', 'mild', 'cheap', 'solo', 'fast', 'light_mood']),
  item('ri03', '咖喱鸡饭', 'rice', ['meat', 'mild', 'mid', 'solo']),
  item('ri04', '排骨饭', 'rice', ['meat', 'mid', 'solo', 'treat']),
  item('ri05', '卤肉饭', 'rice', ['meat', 'mild', 'cheap', 'solo', 'fast']),
  item('ri06', '煲仔饭', 'rice', ['meat', 'mid', 'solo', 'treat', 'heavy']),
  item('ri07', '海南鸡饭', 'rice', ['meat', 'mid', 'solo', 'mild']),
  item('ri08', '牛腩饭', 'rice', ['meat', 'mid', 'solo', 'heavy']),
  item('ri09', '鳗鱼炒饭', 'rice', ['meat', 'expensive', 'solo', 'treat']),
  item('ri10', '香菇滑鸡饭', 'rice', ['meat', 'mild', 'cheap', 'solo', 'fast']),
  item('ri11', '叉烧饭', 'rice', ['meat', 'mid', 'solo']),
  item('ri12', '韩式拌饭', 'rice', ['mixed', 'spicy', 'mid', 'solo']),
  item('ri13', '咖喱牛腩饭', 'rice', ['meat', 'mid', 'solo', 'heavy']),
  item('ri14', '豆豉鲮鱼炒饭', 'rice', ['meat', 'mild', 'cheap', 'solo', 'fast']),
  item('ri15', '虾仁炒饭', 'rice', ['meat', 'mid', 'solo', 'treat']),
  item('ri16', '腊肉焖饭', 'rice', ['meat', 'mid', 'solo', 'heavy']),
  item('ri17', '紫菜包饭', 'rice', ['mixed', 'mild', 'cheap', 'solo', 'fast', 'light_mood']),
  item('ri18', '抓饭', 'rice', ['meat', 'mid', 'solo', 'heavy']),

  // 轻食 (12)
  item('li01', '鸡胸肉沙拉', 'light', ['meat', 'mid', 'solo', 'light_mood', 'fast']),
  item('li02', '牛油果虾仁碗', 'light', ['meat', 'expensive', 'solo', 'light_mood', 'treat']),
  item('li03', '波奇饭（三文鱼）', 'light', ['meat', 'expensive', 'solo', 'light_mood', 'treat']),
  item('li04', '全麦蔬菜三明治', 'light', ['veg', 'cheap', 'solo', 'fast', 'light_mood']),
  item('li05', '藜麦牛肉碗', 'light', ['meat', 'mid', 'solo', 'light_mood']),
  item('li06', '豆腐蔬菜碗', 'light', ['veg', 'cheap', 'solo', 'light_mood']),
  item('li07', '低卡鸡肉卷', 'light', ['meat', 'mid', 'solo', 'fast', 'light_mood']),
  item('li08', '水果酸奶杯+燕麦', 'light', ['veg', 'cheap', 'solo', 'fast', 'light_mood']),
  item('li09', '金枪鱼沙拉', 'light', ['meat', 'mid', 'solo', 'light_mood']),
  item('li10', '蒸红薯+水煮蛋', 'light', ['veg', 'cheap', 'solo', 'fast', 'light_mood']),
  item('li11', '素食 Buddha Bowl', 'light', ['veg', 'mid', 'solo', 'light_mood']),
  item('li12', '虾仁荞麦面沙拉', 'light', ['meat', 'mid', 'solo', 'light_mood']),

  // 火锅烧烤 (12)
  item('hp01', '麻辣火锅（单人锅）', 'hotpot_bbq', ['meat', 'spicy', 'expensive', 'group', 'heavy', 'treat']),
  item('hp02', '番茄火锅', 'hotpot_bbq', ['meat', 'mild', 'mid', 'group', 'light_mood']),
  item('hp03', '潮汕牛肉火锅', 'hotpot_bbq', ['meat', 'expensive', 'group', 'treat', 'light_mood']),
  item('hp04', '烧烤套餐（羊肉串）', 'hotpot_bbq', ['meat', 'mid', 'group', 'heavy', 'treat']),
  item('hp05', '烤鱼', 'hotpot_bbq', ['meat', 'spicy', 'mid', 'group', 'heavy']),
  item('hp06', '铁板烧套餐', 'hotpot_bbq', ['meat', 'expensive', 'solo', 'treat', 'heavy']),
  item('hp07', '串串香', 'hotpot_bbq', ['mixed', 'spicy', 'mid', 'group', 'heavy']),
  item('hp08', '羊蝎子火锅', 'hotpot_bbq', ['meat', 'expensive', 'group', 'heavy', 'treat']),
  item('hp09', '韩式烤肉饭', 'hotpot_bbq', ['meat', 'mid', 'solo', 'heavy']),
  item('hp10', '自助小火锅', 'hotpot_bbq', ['mixed', 'mid', 'solo', 'heavy']),
  item('hp11', '炭烤鸡腿饭', 'hotpot_bbq', ['meat', 'cheap', 'solo', 'fast']),
  item('hp12', '冒菜', 'hotpot_bbq', ['mixed', 'spicy', 'cheap', 'solo', 'fast', 'heavy']),

  // 小吃甜品 (12)
  item('sn01', '鸡排', 'snack', ['meat', 'cheap', 'solo', 'fast', 'heavy']),
  item('sn02', '章鱼烧', 'snack', ['meat', 'cheap', 'solo', 'fast']),
  item('sn03', '鸡蛋仔+奶茶', 'snack', ['veg', 'cheap', 'solo', 'treat']),
  item('sn04', '提拉米苏', 'snack', ['veg', 'mid', 'solo', 'treat']),
  item('sn05', '双皮奶', 'snack', ['veg', 'cheap', 'solo', 'treat', 'light_mood']),
  item('sn06', '炸薯条', 'snack', ['veg', 'cheap', 'solo', 'fast']),
  item('sn07', '肉夹馍', 'snack', ['meat', 'cheap', 'solo', 'fast', 'heavy']),
  item('sn08', '锅盔', 'snack', ['meat', 'cheap', 'solo', 'fast']),
  item('sn09', '红豆刨冰', 'snack', ['veg', 'cheap', 'solo', 'treat', 'light_mood']),
  item('sn10', '芝士蛋糕', 'snack', ['veg', 'mid', 'solo', 'treat']),
  item('sn11', '烤冷面', 'snack', ['veg', 'cheap', 'solo', 'fast', 'heavy']),
  item('sn12', '手抓饼', 'snack', ['mixed', 'cheap', 'solo', 'fast']),

  // 饮品搭配 (10)
  item('dr01', '珍珠奶茶+饭团', 'drink_combo', ['mixed', 'cheap', 'solo', 'fast']),
  item('dr02', '美式咖啡+贝果', 'drink_combo', ['veg', 'mid', 'solo', 'fast', 'light_mood']),
  item('dr03', '拿铁+三明治', 'drink_combo', ['mixed', 'mid', 'solo', 'fast']),
  item('dr04', '柠檬茶+鸡扒饭', 'drink_combo', ['meat', 'mid', 'solo', 'fast']),
  item('dr05', '抹茶拿铁+蛋糕', 'drink_combo', ['veg', 'mid', 'solo', 'treat']),
  item('dr06', '豆浆+油条', 'drink_combo', ['veg', 'cheap', 'solo', 'fast', 'light_mood']),
  item('dr07', '杨枝甘露+轻食', 'drink_combo', ['veg', 'mid', 'solo', 'treat', 'light_mood']),
  item('dr08', '气泡水+沙拉', 'drink_combo', ['veg', 'mid', 'solo', 'light_mood']),
  item('dr09', '酸梅汤+凉皮', 'drink_combo', ['veg', 'cheap', 'solo', 'fast', 'light_mood']),
  item('dr10', '热可可+可颂', 'drink_combo', ['veg', 'mid', 'solo', 'treat']),
];
