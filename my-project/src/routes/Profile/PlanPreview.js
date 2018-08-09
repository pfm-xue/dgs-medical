import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col } from 'antd';
import styles from './PlanPreview.less';

@connect(({ plan, loading }) => ({
  plan,
  planLoading: loading.models.plan,
}))
@Form.create()
export default class PlanPreview extends Component {
  state = {
    modalVisible1: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'plan/show',
      payload: this.props.match.params.id,
    });
  }

  render() {
    const { profile, loading } = this.props;
    const { basicGoods, basicProgress } = profile;
    // dotted
    return (
      <Row>
        <Card>
          <div>
            <Row justify="center">
              <Col className={styles.word}>
                <b>【個別機能訓綶計画書】</b>
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <br />
            <Row>
              {/* solid_left */}
              <Col span="6">作成日:</Col>
              <Col span="7">前回作成日:</Col>
              <Col span="7">計画作成者:</Col>
            </Row>
            <Row>
              <Col span="4">ふりがな</Col>
              <Col span="2">性別</Col>
              <Col span="5">大正　/　昭和</Col>
              <Col span="2">介護認定</Col>
              <Col span="2">管理者</Col>
              <Col span="2">看護</Col>
              <Col span="2">介護</Col>
              <Col span="2">機能訓練</Col>
              <Col span="2">相談員</Col>
            </Row>
            <Row>
              <Col span="4">氏名</Col>
              <Col span="2"> </Col>
              <Col span="5">生　　月　　日生</Col>
              <Col span="2" />
              <Col span="2" />
              <Col span="2" />
              <Col span="2" />
              <Col span="2" />
              <Col span="2" />
            </Row>
            <Row>
              <Col span="9">本人の希望</Col>
              <Col span="9">家族の希望</Col>
              <Col span="6">
                障害老人の日常生活自立度<br />正常 J1 J2 A1 A2 B1 B2 C1 C2
              </Col>
            </Row>
            <Row>
              <Col span="9" />
              <Col span="9" />
              <Col span="6">
                認知症老人の日常生活自立度<br />正常 Ⅰ Ⅱa Ⅱb Ⅲa Ⅲb ⅣM
              </Col>
            </Row>
            <Row>
              <Col span="9">
                病名、合併症(心疾患、吸器疾患等)<br />
                <br />
              </Col>
              <Col span="7">生活課題</Col>
              <Col span="8">在宅環境(生活課題に関連する在宅環境課題)</Col>
            </Row>
            <Row>
              <Col span="9">
                運動時のリスク(血圧、不整脈、呼吸等)<br />
                <br />
              </Col>
              <Col span="7" />
              <Col span="8" />
            </Row>
            <br />
            <br />
            <Row>
              <Col>個別機能訓練加算Ⅰ</Col>
            </Row>
            <br />
            <Row>
              <Col span="4">長期目標:　　年　　月</Col>
              <Col span="16" />
              <Col span="2">
                目標<br />逹成度
              </Col>
              <Col span="2">逹成・一部・未逹</Col>
            </Row>
            <Row>
              <Col span="4">短期目標:　　年　　月</Col>
              <Col span="16" />
              <Col span="2">
                目標<br />逹成度
              </Col>
              <Col span="2">逹成・一部・未逹</Col>
            </Row>
            <br />
            <Row>
              <Col className={styles.center} span="10">
                プログラム内容
              </Col>
              <Col className={styles.center} span="7">
                留意点
              </Col>
              <Col className={styles.center} span="2">
                頻度
              </Col>
              <Col className={styles.center} span="2">
                時間
              </Col>
              <Col className={styles.center} span="3">
                主な実施者
              </Col>
            </Row>
            <Row>
              <Col span="1">①</Col>
              <Col span="9" />
              <Col span="7" />
              <Col span="2" />
              <Col span="2" />
              <Col span="3" />
            </Row>
            <Row>
              <Col span="1">②</Col>
              <Col span="9" />
              <Col span="7" />
              <Col span="2" />
              <Col span="2" />
              <Col span="3" />
            </Row>
            <Row>
              <Col span="1">③</Col>
              <Col span="9" />
              <Col span="7" />
              <Col span="2" />
              <Col span="2" />
              <Col span="3" />
            </Row>
            <Row>
              <Col span="17" />
              <Col span="7">プログラム立案者:</Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col>個別機能訓綶計画書Ⅱ</Col>
            </Row>
            <br />
            <Row>
              <Col span="4">長期目標:　　年　　月</Col>
              <Col span="16" />
              <Col span="2">
                目標<br />逹成度
              </Col>
              <Col span="2">逹成・一部・未逹</Col>
            </Row>
            <Row>
              <Col span="4">短期目標:　　年　　月</Col>
              <Col span="16" />
              <Col span="2">
                目標<br />逹成度
              </Col>
              <Col span="2">逹成・一部・未逹</Col>
            </Row>
            <br />
            <Row>
              <Col className={styles.center} span="10">
                プログラム内容
              </Col>
              <Col className={styles.center} span="7">
                留意点
              </Col>
              <Col className={styles.center} span="2">
                頻度
              </Col>
              <Col className={styles.center} span="2">
                時間
              </Col>
              <Col className={styles.center} span="3">
                主な実施者
              </Col>
            </Row>
            <Row>
              <Col span="1">①</Col>
              <Col span="9" />
              <Col span="7" />
              <Col span="2" />
              <Col span="2" />
              <Col span="3" />
            </Row>
            <Row>
              <Col span="1">②</Col>
              <Col span="9" />
              <Col span="7" />
              <Col span="2" />
              <Col span="2" />
              <Col span="3" />
            </Row>
            <Row>
              <Col span="1">③</Col>
              <Col span="9" />
              <Col span="7" />
              <Col span="2" />
              <Col span="2" />
              <Col span="3" />
            </Row>
            <Row>
              <Col className={styles.dashed} span="17">
                (注)目的を達成するための具体的内容を記載する。(例:買い物に行けるようになるために、屋外歩行を練習するなどを記載。)
              </Col>
              <Col span="7">プログラム立案者:</Col>
            </Row>
            <br />
            <Row>
              <Col span="10">
                特記事項<br />
                <br />
                <br />
                <br />
              </Col>
              <Col span="4">
                <br />
                <br />
                <br />
                <br />
                <br />
              </Col>
              <Col span="10">
                プログラム実施後の変化(総括)　　再評価日： 平成　　年　　月　　日<br />
                <br />
                <br />
                <br />
              </Col>
            </Row>
            {/* top */}
            <br />
            <Row>
              <Col span="17">上記計画の内容について説明を受けました。</Col>
              <Col span="7">上記計画書に基づきサービスの説明を行い</Col>
            </Row>
            <Row>
              <Col className={styles.center} span="17">
                平成　　年　　月　　日
              </Col>
              <Col span="7">内容に同意頂きましたので、ご報告申し上げます。</Col>
            </Row>
            <Row>
              <Col span="17">
                ご本人氏名：<br />
                <br />
              </Col>
              <Col className={styles.center} span="7">
                平成　　年　　月　　日
              </Col>
            </Row>
            <Row>
              <Col span="17">ご家族氏名：</Col>
              <Col className={styles.center} span="7">
                介護支援専門員様 / 事業所様<br />
                <br />
              </Col>
            </Row>
            <br />
            <Row>
              <Col offset="1" span="3">
                通所介護　〇〇
              </Col>
              <Col span="5">〒〇〇〇‐〇〇〇</Col>
              <Col span="11">住所：〇〇県〇〇市〇〇　　00-00</Col>
              <Col span="4">管理者：</Col>
            </Row>
            <Row>
              <Col offset="2" span="8">
                事業所NO.　000000000
              </Col>
              <Col span="10">Tel.000-000-000　/Fax. 000-000-000</Col>
              <Col span="4">説明者：</Col>
            </Row>
            <br />
          </div>
        </Card>
      </Row>
    );
  }
}
