import document from "document";
import exercise from "exercise";
import { user } from "user-profile";

import * as config from "../config";
import Cycle from "../lib/cycle"
import { Application, View, $at } from "../lib/view";
import * as utils from "../lib/utils";
import Clock from "../subviews/clock";
import GPS from "../subviews/gps";
import HRM from "../subviews/hrm";
import Popup from "../subviews/popup";

const $ = $at("#view-sell");

export class ViewSell extends View {
    
  el = $();
  usrAge = $("#usrAge");
  btnBack = $("#btnBack");
  elBoxStats = $("#boxStats");
  usrGender = $("#usrGender");
  usrHeight = $("#usrHeight");
  usrWeight = $("#usrWeight");
  lblActiveTime = $("#lblActiveTime");
  lblHeartRateAvg = $("#lblHeartRateAvg");
  lblHeartRateMax = $("#lblHeartRateMax");
  lblSpeedAvg = $("#lblSpeedAvg");
  lblSpeedMax = $("#lblSpeedMax");
  lblDistance = $("#lblDistance");

  handleBack = () => {
    Application.switchTo("ViewSelect");
  }


  onMount() {
    this.usrAge.text = "Idade: " + user.age + " anos";

    if(user.gender == "male") this.usrGender.text = "Gênero: Masculino";
    else if(user.gender == "female") this.usrGender.text = "Gênero: Feminino";
    else this.usrGender.text = "Gênero: Não definido";
    
    this.usrHeight.text = "Altura: " + user.height + " m";
    this.usrWeight.text = "Peso: " + user.weight + " kg";

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
      
    this.cycle = new Cycle(this.elBoxStats);
    this.btnBack.addEventListener("click", this.handleBack);
  }
    
  onRender() {}
   
  onUnmount() {
    this.cycle.removeEvents();
  }
}