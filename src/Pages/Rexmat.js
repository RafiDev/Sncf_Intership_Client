import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import {Bar} from 'react-chartjs-2'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import Select from 'react-select';

import 'react-circular-progressbar/dist/styles.css'

import './Rexmat.css'
import "react-datepicker/dist/react-datepicker.css"

const timeOptions = [{value: 'semaine', label: 'Semaine'}, {value:'mois', label: 'Mois'}]

class Rexmat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: null,
      startDate: null,
      endDate: null,
      selectedFile: null,
      Hierarchie_de_la_flotte: [],
      Type_de_signalement: [],
      Signalement_H1: [],
      Signalement_H2: [],
      Signalement_H3: [],
      Signalement_H4: [],
      Statut_H1: [],
      Statut_H2: [],
      Statut_H3: [],
      Statut_H4: [],
      Nombre_de_signalements_par_rame_de_la_flotte: [],
      data: [],
    }
    this.handleGetDataFromMongoForWeek  = this.handleGetDataFromMongoForWeek.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSelectTime = this.handleSelectTime.bind(this);
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
    this.barSignalementHierarchie = this.barSignalementHierarchie.bind(this);
    this.barSignalementState = this.barSignalementState.bind(this);
    this.AtraiterStateH1 = this.AtraiterStateH1.bind(this);
    this.AtraiterStateH2 = this.AtraiterStateH2.bind(this);
    this.AtraiterStateH3 = this.AtraiterStateH3.bind(this);
    this.AtraiterStateH4 = this.AtraiterStateH4.bind(this);
    this.AnalyseRexStateH1 = this.AnalyseRexStateH1.bind(this);
    this.AnalyseRexStateH2 = this.AnalyseRexStateH2.bind(this);
    this.AnalyseRexStateH3 = this.AnalyseRexStateH3.bind(this);
    this.AnalyseRexStateH4 = this.AnalyseRexStateH4.bind(this);
    this.AttPiecesStateH1 = this.AttPiecesStateH1.bind(this);
    this.AttPiecesStateH2 = this.AttPiecesStateH2.bind(this);
    this.AttPiecesStateH3 = this.AttPiecesStateH3.bind(this);
    this.AttPiecesStateH4 = this.AttPiecesStateH4.bind(this);
    this.ClotureStateH1 = this.ClotureStateH1.bind(this);
    this.ClotureStateH2 = this.ClotureStateH2.bind(this);
    this.ClotureStateH3 = this.ClotureStateH3.bind(this);
    this.ClotureStateH4 = this.ClotureStateH4.bind(this);
    this.EnCoursStateH1 = this.EnCoursStateH1.bind(this);
    this.EnCoursStateH2 = this.EnCoursStateH2.bind(this);
    this.EnCoursStateH3 = this.EnCoursStateH3.bind(this);
    this.EnCoursStateH4 = this.EnCoursStateH4.bind(this);
    this.RameVigilerStateH1 = this.RameVigilerStateH1.bind(this);
    this.RameVigilerStateH2 = this.RameVigilerStateH2.bind(this);
    this.RameVigilerStateH3 = this.RameVigilerStateH3.bind(this);
    this.RameVigilerStateH4 = this.RameVigilerStateH4.bind(this);
  }

  handleSelectTime = time => {
    this.setState({ time })
  }

  handleStartDate = (date) => {
    this.setState({
      startDate: date
    })
  }

  handleEndDate = (date) => {
    this.setState({
      endDate: date
    })
  }

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  handleUpload = async() => {
    
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)
    data.append('time', this.state.time.value)
    data.append('dateStart', this.state.startDate)
    data.append('dateEnd', this.state.endDate)
    
    await axios
      .post('http://localhost:8000/rexmat', data)
      .then(res => {
        console.log(res.data);
        this.setState({
          Hierarchie_de_la_flotte: res.data['Hiérarchie de la flotte'],
          Type_de_signalement: res.data["Type de signalement"],
          Signalement_H1: res.data["Signalement par hiérarchie"]["H1"],
          Signalement_H2: res.data["Signalement par hiérarchie"]["H2"],
          Signalement_H3: res.data["Signalement par hiérarchie"]["H3"],
          Signalement_H4: res.data["Signalement par hiérarchie"]["H4"],
          Statut_H1: res.data["Statut par hiérarchie"].H1,
          Statut_H2: res.data["Statut par hiérarchie"].H2,
          Statut_H3: res.data["Statut par hiérarchie"].H3,
          Statut_H4: res.data["Statut par hiérarchie"].H4,
          Nombre_de_signalements_par_rame_de_la_flotte: res.data["Nombre de signalements par rame de la flotte L/J"],
          data: res.data,
        })
      })
  }

  handleGetDataFromMongoForWeek  = async() => {
    await axios
      .get('http://localhost:8000/getDataRexmatWeek')
      .then(res => {
        console.log(res.data);
      })
  }

  barSignalementHierarchie = () => {
    const state = {
      labels: ['ATESS', 'Afficheur', 'BS', 'CCTV', 'Climatisation', 'Compresseur', 'Comptage Passagers', 'Coupleur', 'Detection Incendie', 'EMCO', 'EQS', 'Eclairage', 'Frein', 'Lecteur Badge', 'Porte', 'Pupitre', 'STMAutonome', 'Sonorisation', 'TCMS', 'TDB'],
      datasets: [
        {
          label: "Signalement en H1",
          backgroundColor: "crimson",
          borderColor: "red",
          borderWidth: 1,
          data: [this.state.Signalement_H1.ATESS, this.state.Signalement_H1.Afficheur, 
            this.state.Signalement_H1.BS, this.state.Signalement_H1.CCTV, this.state.Signalement_H1.Climatisation,
            this.state.Signalement_H1.Compresseur, this.state.Signalement_H1["Comptage Passagers"],
            this.state.Signalement_H1.Coupleur,
            this.state.Signalement_H1["Detection Incendie"], this.state.Signalement_H1.EMCO, this.state.Signalement_H1.EQS,
            this.state.Signalement_H1.Eclairage, this.state.Signalement_H1.Frein, this.state.Signalement_H1["Lecteur Badge"],
            this.state.Signalement_H1.Porte, this.state.Signalement_H1.Pupitre, this.state.Signalement_H1.STMAutonome,
            this.state.Signalement_H1.Sonorisation, this.state.Signalement_H1.TCMS, this.state.Signalement_H2.TDB],
        },
        {
          label: "Signalement en H2",
          backgroundColor: 'coral',
          borderColor: 'orangered',
          borderWidth: 1,
          data: [this.state.Signalement_H2.ATESS, this.state.Signalement_H2.Afficheur, 
            this.state.Signalement_H2.BS, this.state.Signalement_H2.CCTV, this.state.Signalement_H2.Climatisation,
            this.state.Signalement_H2.Compresseur, this.state.Signalement_H2["Comptage Passagers"],
            this.state.Signalement_H2.Coupleur,
            this.state.Signalement_H2["Detection Incendie"], this.state.Signalement_H2.EMCO, this.state.Signalement_H2.EQS,
            this.state.Signalement_H2.Eclairage, this.state.Signalement_H2.Frein, this.state.Signalement_H2["Lecteur Badge"],
            this.state.Signalement_H2.Porte, this.state.Signalement_H2.Pupitre, this.state.Signalement_H2.STMAutonome,
            this.state.Signalement_H2.Sonorisation, this.state.Signalement_H2.TCMS, this.state.Signalement_H2.TDB],
        },
        {
          label: "Signalement en H3",
          backgroundColor: "orange",
          borderColor: "darkorange",
          borderWidth: 1,
          data: [this.state.Signalement_H3.ATESS, this.state.Signalement_H3.Afficheur, 
            this.state.Signalement_H3.BS, this.state.Signalement_H3.CCTV, this.state.Signalement_H3.Climatisation,
            this.state.Signalement_H3.Compresseur, this.state.Signalement_H3["Comptage Passagers"],
            this.state.Signalement_H3.Coupleur,
            this.state.Signalement_H3["Detection Incendie"], this.state.Signalement_H3.EMCO, this.state.Signalement_H3.EQS,
            this.state.Signalement_H3.Eclairage, this.state.Signalement_H3.Frein, this.state.Signalement_H3["Lecteur Badge"],
            this.state.Signalement_H3.Porte, this.state.Signalement_H3.Pupitre, this.state.Signalement_H3.STMAutonome,
            this.state.Signalement_H3.Sonorisation, this.state.Signalement_H3.TCMS, this.state.Signalement_H3.TDB],
        },
        {
          label: "Signalement en H4",
          backgroundColor: "yellow",
          borderColor: "gold",
          borderWidth: 1,
          data: [this.state.Signalement_H4.ATESS, this.state.Signalement_H4.Afficheur, 
            this.state.Signalement_H4.BS, this.state.Signalement_H4.CCTV, this.state.Signalement_H4.Climatisation,
            this.state.Signalement_H4.Compresseur, this.state.Signalement_H4["Comptage Passagers"],
            this.state.Signalement_H4.Coupleur,
            this.state.Signalement_H4["Detection Incendie"], this.state.Signalement_H4.EMCO, this.state.Signalement_H4.EQS,
            this.state.Signalement_H4.Eclairage, this.state.Signalement_H4.Frein, this.state.Signalement_H4["Lecteur Badge"],
            this.state.Signalement_H4.Porte, this.state.Signalement_H4.Pupitre, this.state.Signalement_H4.STMAutonome,
            this.state.Signalement_H4.Sonorisation, this.state.Signalement_H4.TCMS, this.state.Signalement_H4.TDB],
        }
      ]
    }
    return state;
  }

  barSignalementState = () => {
    const state = {
      labels: ['A traiter', 'Analyse Rex', 'Att Pièces', 'Cloturé', 'En cours', 'Rame à vigiler'],
      datasets: [
        {
          label: "Statut en H1",
          backgroundColor: "crimson",
          borderColor: "red",
          borderWidth: 1,
          data: [
            this.state.Statut_H1['A traiter'], this.state.Statut_H1['Analyse REX'],
            this.state.Statut_H1['Att pièces'], this.state.Statut_H1.Cloturé,
            this.state.Statut_H1['En cours'], this.state.Statut_H1['Rame à vigiler']
          ]
        },
        {
          label: "Statut en H2",
          backgroundColor: 'coral',
          borderColor: 'orangered',
          borderWidth: 1,
          data: [
            this.state.Statut_H2['A traiter'], this.state.Statut_H2['Analyse REX'],
            this.state.Statut_H2['Att pièces'], this.state.Statut_H2.Cloturé,
            this.state.Statut_H2['En cours'], this.state.Statut_H2['Rame à vigiler']
          ]
        },
        {
          label: "Statut en H3",
          backgroundColor: "orange",
          borderColor: "darkorange",
          borderWidth: 1,
          data: [
            this.state.Statut_H3['A traiter'], this.state.Statut_H3['Analyse REX'],
            this.state.Statut_H3['Att pièces'], this.state.Statut_H3.Cloturé,
            this.state.Statut_H3['En cours'], this.state.Statut_H3['Rame à vigiler']
          ]
        },
        {
          label: "Statut en H4",
          backgroundColor: "yellow",
          borderColor: "gold",
          borderWidth: 1,
          data: [
            this.state.Statut_H4['A traiter'], this.state.Statut_H4['Analyse REX'],
            this.state.Statut_H4['Att pièces'], this.state.Statut_H4.Cloturé,
            this.state.Statut_H4['En cours'], this.state.Statut_H4['Rame à vigiler']
          ]
        },
      ]
    }
    return state
  }

  AtraiterStateH1 = () => {
    const v1 = this.state.Statut_H1['A traiter'];
    const v2 = this.state.Statut_H1['Nombre de Statut total H1'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  AtraiterStateH2 = () => {
    const v1 = this.state.Statut_H2['A traiter'];
    const v2 = this.state.Statut_H2['Nombre de Statut total H2'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  AtraiterStateH3 = () => {
    const v1 = this.state.Statut_H3['A traiter'];
    const v2 = this.state.Statut_H3['Nombre de Statut total H3'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  AtraiterStateH4 = () => {
    const v1 = this.state.Statut_H4['A traiter'];
    const v2 = this.state.Statut_H4['Nombre de Statut total H4'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  AnalyseRexStateH1 = () => {
    const v1 = this.state.Statut_H1['Analyse REX'];
    const v2 = this.state.Statut_H1['Nombre de Statut total H1'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  AnalyseRexStateH2 = () => {
    const v1 = this.state.Statut_H2['Analyse REX'];
    const v2 = this.state.Statut_H2['Nombre de Statut total H2'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  AnalyseRexStateH3 = () => {
    const v1 = this.state.Statut_H3['Analyse REX'];
    const v2 = this.state.Statut_H3['Nombre de Statut total H3'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  AnalyseRexStateH4 = () => {
    const v1 = this.state.Statut_H4['Analyse REX'];
    const v2 = this.state.Statut_H4['Nombre de Statut total H4'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  AttPiecesStateH1 = () => {
    const v1 = this.state.Statut_H1['Att pièces'];
    const v2 = this.state.Statut_H1['Nombre de Statut total H1'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  AttPiecesStateH2 = () => {
    const v1 = this.state.Statut_H2['Att pièces'];
    const v2 = this.state.Statut_H2['Nombre de Statut total H2'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  AttPiecesStateH3 = () => {
    const v1 = this.state.Statut_H3['Att pièces'];
    const v2 = this.state.Statut_H3['Nombre de Statut total H3'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  AttPiecesStateH4 = () => {
    const v1 = this.state.Statut_H4['Att pièces'];
    const v2 = this.state.Statut_H4['Nombre de Statut total H4'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  ClotureStateH1 = () => {
    const v1 = this.state.Statut_H1.Cloturé;
    const v2 = this.state.Statut_H1['Nombre de Statut total H1'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  ClotureStateH2 = () => {
    const v1 = this.state.Statut_H2.Cloturé;
    const v2 = this.state.Statut_H2['Nombre de Statut total H2'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  ClotureStateH3 = () => {
    const v1 = this.state.Statut_H3.Cloturé;
    const v2 = this.state.Statut_H3['Nombre de Statut total H3'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  ClotureStateH4 = () => {
    const v1 = this.state.Statut_H4.Cloturé;
    const v2 = this.state.Statut_H4['Nombre de Statut total H4'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  EnCoursStateH1 = () => {
    const v1 = this.state.Statut_H1['En cours'];
    const v2 = this.state.Statut_H1['Nombre de Statut total H1'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  EnCoursStateH2 = () => {
    const v1 = this.state.Statut_H2['En cours'];
    const v2 = this.state.Statut_H2['Nombre de Statut total H2'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  EnCoursStateH3 = () => {
    const v1 = this.state.Statut_H3['En cours'];
    const v2 = this.state.Statut_H3['Nombre de Statut total H3'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  EnCoursStateH4 = () => {
    const v1 = this.state.Statut_H4['En cours'];
    const v2 = this.state.Statut_H4['Nombre de Statut total H4'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  RameVigilerStateH1 = () => {
    const v1 = this.state.Statut_H1['Rame à vigiler'];
    const v2 = this.state.Statut_H1['Nombre de Statut total H1'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  RameVigilerStateH2 = () => {
    const v1 = this.state.Statut_H2['Rame à vigiler'];
    const v2 = this.state.Statut_H2['Nombre de Statut total H2'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  RameVigilerStateH3 = () => {
    const v1 = this.state.Statut_H3['Rame à vigiler'];
    const v2 = this.state.Statut_H3['Nombre de Statut total H3'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  RameVigilerStateH4 = () => {
    const v1 = this.state.Statut_H4['Rame à vigiler'];
    const v2 = this.state.Statut_H4['Nombre de Statut total H4'];
    const percent = v1 * 100 / v2;

    return percent.toFixed(2);
  }

  render() {
    return (
      <div className='all'>
        <h1>Rexmat file data</h1>
        <div className="selectTime">
          <Select 
            value={this.state.time}
            onChange={this.handleSelectTime}
            options={timeOptions}
            placeholder="Selectionner la durée"
          />
        </div>
        <br/>
        <div className="date">
          <DatePicker 
            selected={this.state.startDate}
            onChange={this.handleStartDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            placeholderText="Date de début"
          />
          <DatePicker 
            selected={this.state.endDate}
            onChange={this.handleEndDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            minDate={this.state.startDate}
            placeholderText="Date de fin"
          />
        </div>
        <br/>
        <div className ="upload">
          <input type="file" name="" id="" onChange={this.handleselectedFile} />
          <button onClick={this.handleUpload}>Upload</button>
        </div>
        <br/>
        <div className='btn-Week'>
          <button onClick={this.handleGetDataFromMongoForWeek }>Create JSON file for week</button>
        </div>
        <br/>
        <div className='bar'>
        <div className='barSignalement'>
            <Bar
              data={this.barSignalementHierarchie()}
            />
        </div>
        <br/>
          <div className='barStates'>
            <Bar
              data={this.barSignalementState()}
            />
          </div>
        </div>
        <br/>
        <div className='Statut'>
          <div className='traiterH1'>
            <h4>Pourcentage de à traiter en H1</h4>
            <CircularProgressbar 
              value={this.AtraiterStateH1()}
              text={`${this.state.Statut_H1['A traiter']} - ${this.AtraiterStateH1()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='traiterH2'>
            <h4>Pourcentage de à traiter en H2</h4>
            <CircularProgressbar 
              value={this.AtraiterStateH2()}
              text={`${this.state.Statut_H2['A traiter']} - ${this.AtraiterStateH2()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='traiterH3'>
            <h4>Pourcentage de à traiter en H3</h4>
            <CircularProgressbar 
              value={this.AtraiterStateH3()}
              text={`${this.state.Statut_H3['A traiter']} - ${this.AtraiterStateH3()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='traiterH4'>
            <h4>Pourcentage de à traiter en H4</h4>
            <CircularProgressbar 
              value={this.AtraiterStateH4()}
              text={`${this.state.Statut_H4['A traiter']} - ${this.AtraiterStateH4()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='AnalyseRexH1'>
            <h4>Pourcentage de analyse REX en H1</h4>
            <CircularProgressbar 
              value={this.AnalyseRexStateH1()}
              text={`${this.state.Statut_H1['Analyse REX']} - ${this.AnalyseRexStateH1()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='AnalyseRexH2'>
            <h4>Pourcentage de analyse REX en H2</h4>
            <CircularProgressbar 
              value={this.AnalyseRexStateH2()}
              text={`${this.state.Statut_H2['Analyse REX']} - ${this.AnalyseRexStateH2()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='AnalyseRexH3'>
            <h4>Pourcentage de analyse REX en H3</h4>
            <CircularProgressbar 
              value={this.AnalyseRexStateH3()}
              text={`${this.state.Statut_H3['Analyse REX']} - ${this.AnalyseRexStateH3()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='AnalyseRexH4'>
            <h4>Pourcentage de analyse REX en H1</h4>
            <CircularProgressbar 
              value={this.AnalyseRexStateH4()}
              text={`${this.state.Statut_H4['Analyse REX']} - ${this.AnalyseRexStateH4()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='piecesH1'>
            <h4>Pourcentage d'att pièces en H1</h4>
            <CircularProgressbar 
              value={this.AttPiecesStateH1()}
              text={`${this.state.Statut_H1['Att pièces']} - ${this.AttPiecesStateH1()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='piecesH2'>
            <h4>Pourcentage d'att pièces en H2</h4>
            <CircularProgressbar 
              value={this.AttPiecesStateH2()}
              text={`${this.state.Statut_H2['Att pièces']} - ${this.AttPiecesStateH2()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />  
          </div>
          <br/>
          <div className='piecesH3'>
            <h4>Pourcentage d'att pièces en H3</h4>
            <CircularProgressbar 
              value={this.AttPiecesStateH3()}
              text={`${this.state.Statut_H3['Att pièces']} - ${this.AttPiecesStateH3()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='piecesH4'>
            <h4>Pourcentage d'att pièces en H4</h4>
            <CircularProgressbar 
              value={this.AttPiecesStateH4()}
              text={`${this.state.Statut_H4['Att pièces']} - ${this.AttPiecesStateH4()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />  
          </div>
          <br/>
          <div className='clotureH1'>
            <h4>Pourcentage de cloturé en H1</h4>
            <CircularProgressbar 
              value={this.ClotureStateH1()}
              text={`${this.state.Statut_H1.Cloturé} - ${this.ClotureStateH1()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='clotureH2'>
            <h4>Pourcentage de cloturé en H2</h4>
            <CircularProgressbar 
              value={this.ClotureStateH2()}
              text={`${this.state.Statut_H2.Cloturé} - ${this.ClotureStateH2()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />    
          </div>
          <br/>
          <div className='clotureH3'>
            <h4>Pourcentage de cloturé en H3</h4>
            <CircularProgressbar 
              value={this.ClotureStateH3()}
              text={`${this.state.Statut_H3.Cloturé} - ${this.ClotureStateH3()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            /> 
          </div>
          <br/>
          <div className='clotureH4'>
            <h4>Pourcentage de cloturé en H4</h4>
            <CircularProgressbar 
              value={this.ClotureStateH4()}
              text={`${this.state.Statut_H4.Cloturé} - ${this.ClotureStateH4()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='EnCoursH1'>
            <h4>Pourcentage de en cours en H1</h4>
            <CircularProgressbar 
              value={this.EnCoursStateH1()}
              text={`${this.state.Statut_H1['En cours']} - ${this.EnCoursStateH1()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='EnCoursH2'>
            <h4>Pourcentage de en cours en H2</h4>
            <CircularProgressbar 
              value={this.EnCoursStateH2()}
              text={`${this.state.Statut_H2['En cours']} - ${this.EnCoursStateH2()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='EnCoursH3'>
            <h4>Pourcentage de en cours en H3</h4>
            <CircularProgressbar 
              value={this.EnCoursStateH3()}
              text={`${this.state.Statut_H3['En cours']} - ${this.EnCoursStateH3()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='EnCoursH4'>
            <h4>Pourcentage de en cours en H4</h4>
            <CircularProgressbar 
              value={this.EnCoursStateH4()}
              text={`${this.state.Statut_H4['En cours']} - ${this.EnCoursStateH4()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='vigilerH1'>
            <h4>Pourcentage de rame à vigiler H1</h4>
            <CircularProgressbar 
              value={this.RameVigilerStateH1()}
              text={`${this.state.Statut_H1['Rame à vigiler']} - ${this.RameVigilerStateH1()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='vigilerH2'>
            <h4>Pourcentage de rame à vigiler H2</h4>
            <CircularProgressbar 
              value={this.RameVigilerStateH2()}
              text={`${this.state.Statut_H2['Rame à vigiler']} - ${this.RameVigilerStateH2()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='vigilerH3'>
            <h4>Pourcentage de rame à vigiler H3</h4>
            <CircularProgressbar 
              value={this.RameVigilerStateH3()}
              text={`${this.state.Statut_H3['Rame à vigiler']} - ${this.RameVigilerStateH3()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
          <br/>
          <div className='vigilerH4'>
            <h4>Pourcentage de rame à vigiler H4</h4>
            <CircularProgressbar 
              value={this.RameVigilerStateH4()}
              text={`${this.state.Statut_H4['Rame à vigiler']} - ${this.RameVigilerStateH4()}%`}
              circleRatio={0.6}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 5,
                strokeLinecap: 'butt',
                trailColor: '#eee',
                textSize: '10px',
              })}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Rexmat