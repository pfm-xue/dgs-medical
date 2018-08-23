const config = require('../config');
const logger = require('../lib/logging').getLogger('lib/export_xlsx');

const xlsxTemplate = require('xlsx-template');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const moment = require('moment');

const mdb = require('../mongoose');

//读模板
function readFileP(template_path) {
  return fs.readFileSync(template_path);
}
//写文件
function writeFileP(filename, newData) {
  fs.writeFileSync(path.join(__dirname, '..', '/public/excel/', `${filename}.xlsx`), newData, 'binary');
}
//
// 打印
exports.printTicketTemplate = async (ticket) => {
  const form_data = ticket;
  
  var filename;
  var template_path;
  if(form_data.pattern === "plan"){
    filename = "個別機能訓綶計画書";
    template_path = path.join(__dirname, '..', 'public', '個別機能訓綶計画書.xlsx');
  }
  if(form_data.pattern === "assessment") {
    filename = "アセスメント";
    template_path = path.join(__dirname, '..', 'public', 'アセスメント.xlsx');
  }
  const data = await readFileP(template_path);
  const t = new xlsxTemplate(data);

  function enumList(data) {
    let value = {
      programContent : "",
      attention : "",
      frequency : "",
      time : "",
      personLiable : "",
    };
    if (typeof data !== 'undefined') {
      value = data;
    }
    return value;
  }

  
  if (form_data.pattern === "plan") {
    t.substitute(1, {
      createDate: moment(form_data.createDate).format('YYYY-MM-DD'), // 作成日
      createLastTime: moment(form_data.createLastTime).format('YYYY-MM-DD'), // 前回作成日
      planAuthor: form_data.planAuthor.adminName, // 計画作成者
      userName: form_data.user.name, // 氏名
      userPhonetic: form_data.user.phonetic, // ふりがな
      userSex: form_data.user.sex, // 性別
      userBirth: moment(form_data.user.birth).format('YYYY-MM-DD'), // 生年月日
      certification: form_data.certification.adminName, // 介護認定
      admin: form_data.admin.adminName, // 管理者
      nursing: form_data.nursing.adminName, // 看護
      nursingCare: form_data.nursingCare.adminName, // 介護
      functionalTraining: form_data.functionalTraining.adminName, // 機能訓練
      counselor: form_data.counselor.adminName, // 相談員
      oneselfDesire: form_data.oneselfDesire, // 本人の希望
      familyDesire: form_data.familyDesire, // 家族の希望
      disorder: form_data.disorder, // 障害老人の日常生活自立度
      dementia: form_data.dementia, // 認知症老人の日常生活自立度
      diseaseName: form_data.diseaseName, // 病名、合併症(心疾患、吸器疾患等)
      exerciseRisk: form_data.exerciseRisk, // 運動時のリスク(血圧、不整脈、呼吸等)
      lifeIssues: form_data.lifeIssues, // 生活課題
      homeEnvironment: form_data.homeEnvironment, // 在宅環境(生活課題に関連する在宅環境課題)

      // 個別機能訓練加算Ⅰ
      add_longTermGoals: form_data.additionalTraining.longTermGoals, // 長期目標
      add_longCalculation: form_data.additionalTraining.longCalculation, // 長期算定
      add_longTermGoalsDegree: form_data.additionalTraining.longTermGoalsDegree, // 目標逹成度
      add_shortTermGoals: form_data.additionalTraining.shortTermGoals, // 短期目標
      add_shortCalculation: form_data.additionalTraining.shortCalculation, // 短期算定
      add_shortTermGoalsDegree: form_data.additionalTraining.shortTermGoalsDegree, // 目標逹成度
      
      // // NO.1
      add_enum_1_programContent: enumList(form_data.additionalTraining.enum[0]).programContent, // プログラム内容
      add_enum_1_attention: enumList(form_data.additionalTraining.enum[0]).attention, // 留意点
      add_enum_1_frequency: enumList(form_data.additionalTraining.enum[0]).frequency, // 頻度
      add_enum_1_time: enumList(form_data.additionalTraining.enum[0]).time, // 時間
      add_enum_1_personLiable: enumList(form_data.additionalTraining.enum[0]).personLiable, // 主な実施者

      // NO.2
      add_enum_2_programContent: enumList(form_data.additionalTraining.enum[1]).programContent, // プログラム内容
      add_enum_2_attention: enumList(form_data.additionalTraining.enum[1]).attention, // 留意点
      add_enum_2_frequency: enumList(form_data.additionalTraining.enum[1]).frequency, // 頻度
      add_enum_2_time: enumList(form_data.additionalTraining.enum[1]).time, // 時間
      add_enum_2_personLiable: enumList(form_data.additionalTraining.enum[1]).personLiable, // 主な実施者
      
      // NO.3
      add_enum_3_programContent: enumList(form_data.additionalTraining.enum[2]).programContent, // プログラム内容
      add_enum_3_attention: enumList(form_data.additionalTraining.enum[2]).attention, // 留意点
      add_enum_3_frequency: enumList(form_data.additionalTraining.enum[2]).frequency, // 頻度
      add_enum_3_time: enumList(form_data.additionalTraining.enum[2]).time, // 時間
      add_enum_3_personLiable: enumList(form_data.additionalTraining.enum[2]).personLiable, // 主な実施者  

      add_mastermind: form_data.additionalTraining.mastermind, // プログラム立案者

      // 個別機能訓練計画書Ⅱ
      plan_longTermGoals: form_data.planTow.longTermGoals, // 長期目標
      plan_longCalculation: form_data.planTow.longCalculation, // 長期算定
      plan_longTermGoalsDegree: form_data.planTow.longTermGoalsDegree, // 目標逹成度
      plan_shortTermGoals: form_data.planTow.shortTermGoals, // 短期目標
      plan_shortCalculation: form_data.planTow.shortCalculation, // 短期算定
      plan_shortTermGoalsDegree: form_data.planTow.shortTermGoalsDegree, // 目標逹成度

      // // NO.1
      plan_enum_1_programContent: enumList(form_data.planTow.enum[0]).programContent, // プログラム内容
      plan_enum_1_attention: enumList(form_data.planTow.enum[0]).attention, // 留意点
      plan_enum_1_frequency: enumList(form_data.planTow.enum[0]).frequency, // 頻度
      plan_enum_1_time: enumList(form_data.planTow.enum[0]).time, // 時間
      plan_enum_1_personLiable: enumList(form_data.planTow.enum[0]).personLiable, // 主な実施者

      // NO.2
      plan_enum_2_programContent: enumList(form_data.planTow.enum[1]).programContent, // プログラム内容
      plan_enum_2_attention: enumList(form_data.planTow.enum[1]).attention, // 留意点
      plan_enum_2_frequency: enumList(form_data.planTow.enum[1]).frequency, // 頻度
      plan_enum_2_time: enumList(form_data.planTow.enum[1]).time, // 時間
      plan_enum_2_personLiable: enumList(form_data.planTow.enum[1]).personLiable, // 主な実施者
      
      // NO.3
      plan_enum_3_programContent: enumList(form_data.planTow.enum[2]).programContent, // プログラム内容
      plan_enum_3_attention: enumList(form_data.planTow.enum[2]).attention, // 留意点
      plan_enum_3_frequency: enumList(form_data.planTow.enum[2]).frequency, // 頻度
      plan_enum_3_time: enumList(form_data.planTow.enum[2]).time, // 時間
      plan_enum_3_personLiable: enumList(form_data.planTow.enum[2]).personLiable, // 主な実施者

      // NO.4
      plan_enum_4_programContent: enumList(form_data.planTow.enum[3]).programContent, // プログラム内容
      plan_enum_4_attention: enumList(form_data.planTow.enum[3]).attention, // 留意点
      plan_enum_4_frequency: enumList(form_data.planTow.enum[3]).frequency, // 頻度
      plan_enum_4_time: enumList(form_data.planTow.enum[3]).time, // 時間
      plan_enum_4_personLiable: enumList(form_data.planTow.enum[3]).personLiable, // 主な実施者          

      plan_mastermind: form_data.planTow.mastermind, // プログラム立案者

      specialNotes: form_data.specialNotes, // 特記事項

    });
  }
  if (form_data.pattern === "assessment") {
    
    t.substitute(1, {
      //    関節可動域
      joint_arm: form_data.joint_arm,   // 上肢
      joint_legs: form_data.joint_legs, // 下肢
      joint_runk: form_data.joint_runk, // 体幹
      //    筋力
      tendon_arm: form_data.tendon_arm,   // 上肢
      tendon_legs: form_data.tendon_legs, // 下肢
      tendon_runk: form_data.tendon_runk, // 体幹
      //    麻痺
      paralysis_arm: form_data.paralysis_arm,       // 上肢
      paralysis_legs: form_data.paralysis_legs,     // 下肢
      paralysis_finger: form_data.paralysis_finger, // 手指
      //    ADL Barthel Index
      meal: form_data.meal,             // 食事
      move: form_data.move,             // 車椅子〜ベッドへの移乗
      aesthetic: form_data.aesthetic,   // 整容
      toilet: form_data.toilet,         // トイレ動作
      bath: form_data.bath,             // 入浴
      walking: form_data.walking,       // 歩行
      stairs: form_data.stairs,         // 階段昇降
      change: form_data.change,         // 着替え
      defecation: form_data.defecation, // 排便コントロール
      total: form_data.total,           // 合計点
      //    家庭でのIADL
      shopping: form_data.shopping,     // 買い物
      cook: form_data.cook,             // 調理
      cleaning: form_data.cleaning,     // 掃除
      washing: form_data.washing,       // 洗濯
      //    評価日
      total_Short: moment(form_data.total_Short).format('YYYY-MM-DD'),   // 評価日
     
      //    Short Physical Performance Battery
      //    バランス
      closedStance: form_data.closedStance,  // 閉脚立位
      semiTandem: form_data.semiTandem,      // セミタンデム位
      tandem: form_data.tandem,              // タンデム位
      //    4ｍ　歩行テスト
      subsidize: form_data.subsidize,   // 補助具の使用
      noOne: form_data.noOne,           // 1回目
      noTwo: form_data.noTwo,           // 2回目
      chair: form_data.chair,           // 椅子立ち上がりテスト 5回

    });
  }

  //新文件名
  const newData = t.generate(); 
  await writeFileP(filename, newData);
  return `${filename}.xlsx`;
};
