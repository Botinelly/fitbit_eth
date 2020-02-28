import exercise from "exercise";
import document from "document";

import * as utils from "../lib/utils";
import Cycle from "../lib/cycle"
import { View, $at, Application } from "../lib/view";
import Clock from "../subviews/clock";
import Popup from "../subviews/popup";

const $ = $at("#view-end");

export class ViewEnd extends View {
  el = $();

  btnSell = $("#btnSell");
  lblActiveTime = $("#lblActiveTime");
  lblHeartRateAvg = $("#lblHeartRateAvg");
  lblHeartRateMax = $("#lblHeartRateMax");
  lblSpeedAvg = $("#lblSpeedAvg");
  lblSpeedMax = $("#lblSpeedMax");
  lblDistance = $("#lblDistance");
  
  handleSell = () => {
    let popupSettings = {
      title: "Vender os dados?",
      message: `Tem certeza que deseja vender?`,
      btnLeftLabel: "Não",
      btnLeftCallback: this.handlePopupNo,
      btnRightLabel: "Sim",
      btnRightCallback: this.handlePopupYes
    }; 
    this.popup = new Popup("#popup2", popupSettings);
    this.insert(this.popup);
  };

  handlePopupNo = () => {
    this.remove(this.popup);
  };

  handlePopupYes = () => {
    this.remove(this.popup);
    Application.switchTo("ViewSell");
  };

  handleCancel = () => {
    this.gps.callback = undefined;
    Application.switchTo("ViewEnd");
  }


  onMount() {
    this.clock = new Clock("#subview-clock2", "seconds");
    this.insert(this.clock);

    this.lblActiveTime.text = `Tempo ativo: ${utils.formatActiveTime(
      exercise.stats.activeTime || 0
    )}`;

    this.lblHeartRateAvg.text = `BPM média: ${exercise.stats.heartRate
      .average || 0} bpm`;
    this.lblHeartRateMax.text = `BPM max: ${exercise.stats.heartRate
      .max || 0} bpm`;

    const speedAvg = utils.formatSpeed(exercise.stats.speed.average || 0);
    this.lblSpeedAvg.text = `Veloc. média: ${speedAvg.value} km/h`;

    const speedMax = utils.formatSpeed(exercise.stats.speed.max || 0);
    this.lblSpeedMax.text = `Veloc. máx: ${speedMax.value} km/h`;

    const distance = utils.formatDistance(exercise.stats.distance || 0);
    this.lblDistance.text = `Distância: ${distance.value} km`;

    this.btnSell.addEventListener("click", this.handleSell);
    // document.addEventListener("keypress", this.handleButton);
  }

  onRender() {
  }

  onUnmount() {
    this.btnSell.removeEventListener("click", this.handleSell);
    // document.removeEventListener("keypress", this.handleButton);
  }
}
