import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

const endpoint = 'https://sncf-intership-server.herokuapp.com/rexmat'

class Rexmat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
      selectedFile: null,
      loaded: null,
      Hierarchie_de_la_flotte: [],
      Nombre_de_signalement_par_hierarchie: [],
      Nombre_de_système_total: null,
      Type_de_signalement: [],
      Signalement_SET: [],
      Signalement_H1: [],
      Signalement_H2: [],
      Signalement_H3: [],
      Signalement_H4: [],
      liste_signalement_rexmat: []
    }
    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleEndDate = this.handleEndDate.bind(this);
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
    const axiosConfig = {
      headers: {
        'Access-Control-Allow-Origin': 'https://sncf-intership-server.herokuapp.com',
      }
    }
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    await axios
      .post('http://localhost:8000/rexmat', data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          })
        },
      })
      .then(res => {
        console.log(res.data);
        /*this.setState({
          Hierarchie_de_la_flotte: res.data.data["Hiérarchie de la flotte"],
          Nombre_de_signalement_par_hierarchie: res.data.data["Nombre de signalement par hiérarchie"],
          Nombre_de_système_total: res.data.data["Nombre de système total"],
          Type_de_signalement: res.data.data["Type de signalement"],
          Signalement_SET: res.data.data["Type de signalement"].SET,
          Signalement_H1: res.data.data["Nombre de signalement par hiérarchie"]["systeme en H1"],
          Signalement_H2: res.data.data["Nombre de signalement par hiérarchie"]["systeme en H2"],
          Signalement_H3: res.data.data["Nombre de signalement par hiérarchie"]["systeme en H3"],
          Signalement_H4: res.data.data["Nombre de signalement par hiérarchie"]["systeme en H4"],
          liste_signalement_rexmat: res.data.data["liste signalement rexmat"]
        })*/
      })
  }

  render() {
    return (
      <div>
          <h1>Rexmat file data</h1>
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
          <br/>
          <br/>
          <input type="file" name="" id="" onChange={this.handleselectedFile} />
          <button onClick={this.handleUpload}>Upload</button>
          <br/>
          <div> {Math.round(this.state.loaded, 2)} %</div>
          <br/>
          <table>
            <thead>
              <tr>
                <th>Nombre de système total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.Nombre_de_système_total}</td>
              </tr>
            </tbody>
          </table>
          <br/>
          <table>
            <thead>
              <tr>
              <th>H1</th>
              <th>H2</th>
              <th>H3</th>
              <th>H4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.Hierarchie_de_la_flotte.H1}</td>
                <td>{this.state.Hierarchie_de_la_flotte.H2}</td>
                <td>{this.state.Hierarchie_de_la_flotte.H3}</td>
                <td>{this.state.Hierarchie_de_la_flotte.H4}</td>
              </tr>
            </tbody>
          </table>
          <br/>
          <table>
            <thead>
              <tr>
              <th>Nombre total de SET</th>
              <th>Nombre total de CBM</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.Type_de_signalement["Nombre total de SET"]}</td>
                <td>{this.state.Type_de_signalement["Nombre total de CBM"]}</td>
              </tr>
            </tbody>
          </table>
          <br/>
          <h2>Nombre de systeme au total</h2>
          <ul>
            <li>ATESS: {this.state.Signalement_SET.ATESS}</li>
            <li>Afficheur: {this.state.Signalement_SET.Afficheur}</li>
            <li>BS: {this.state.Signalement_SET.BS}</li>
            <li>CCTV: {this.state.Signalement_SET.CCTV}</li>
            <li>Climatisation: {this.state.Signalement_SET.Climatisation}</li>
            <li>Compresseur: {this.state.Signalement_SET.Compresseur}</li>
            <li>Comptage Passagers: {this.state.Signalement_SET["Comptage Passagers"]}</li>
            <li>Detection Incendie: {this.state.Signalement_SET["Detection Incendie"]}</li>
            <li>EMCO: {this.state.Signalement_SET.EMCO}</li>
            <li>EQS: {this.state.Signalement_SET.EQS}</li>
            <li>Eclairage: {this.state.Signalement_SET.Eclairage}</li>
            <li>Frein: {this.state.Signalement_SET.Frein}</li>
            <li>Lecteur Badge: {this.state.Signalement_SET["Lecteur Badge"]}</li>
            <li>Porte: {this.state.Signalement_SET.Porte}</li>
            <li>Pupitre: {this.state.Signalement_SET.Pupitre}</li>
            <li>Sonorisation: {this.state.Signalement_SET.Sonorisation}</li>
            <li>TCMS: {this.state.Signalement_SET.TCMS}</li>
            <li>Traction: {this.state.Signalement_SET.Traction}</li>
          </ul>
          <br/>
          <h2>Liste de signalement rexmat</h2>
          <ul>
            {this.state.liste_signalement_rexmat.map(liste => (<li key={liste}>{liste}</li>))}
          </ul>
          <br/>
          <h2>Nombre de systeme en H1</h2>
          <ul>
            <li>ATESS: {this.state.Signalement_H1.ATESS}</li>
            <li>Afficheur: {this.state.Signalement_H1.Afficheur}</li>
            <li>BS: {this.state.Signalement_H1.BS}</li>
            <li>CCTV: {this.state.Signalement_H1.CCTV}</li>
            <li>Climatisation: {this.state.Signalement_H1.Climatisation}</li>
            <li>Compresseur: {this.state.Signalement_H1.Compresseur}</li>
            <li>Comptage Passagers: {this.state.Signalement_H1["Comptage Passagers"]}</li>
            <li>Detection Incendie: {this.state.Signalement_H1["Detection Incendie"]}</li>
            <li>EMCO: {this.state.Signalement_H1.EMCO}</li>
            <li>EQS: {this.state.Signalement_H1.EQS}</li>
            <li>Eclairage: {this.state.Signalement_H1.Eclairage}</li>
            <li>Frein: {this.state.Signalement_H1.Frein}</li>
            <li>Lecteur Badge: {this.state.Signalement_H1["Lecteur Badge"]}</li>
            <li>Porte: {this.state.Signalement_H1.Porte}</li>
            <li>Pupitre: {this.state.Signalement_H1.Pupitre}</li>
            <li>Sonorisation: {this.state.Signalement_H1.Sonorisation}</li>
            <li>TCMS: {this.state.Signalement_H1.TCMS}</li>
            <li>Traction: {this.state.Signalement_H1.Traction}</li>
            <li>Total de SET en H1: {this.state.Signalement_H1["Nombre de SET en H1"]}</li>
            <li>Total de CBM en H1: {this.state.Signalement_H1["Nombre de CBM en H1"]}</li>
          </ul>
          <br/>
          <h2>Nombre de systeme en H2</h2>
          <ul>
            <li>ATESS: {this.state.Signalement_H2.ATESS}</li>
            <li>Afficheur: {this.state.Signalement_H2.Afficheur}</li>
            <li>BS: {this.state.Signalement_H2.BS}</li>
            <li>CCTV: {this.state.Signalement_H2.CCTV}</li>
            <li>Climatisation: {this.state.Signalement_H2.Climatisation}</li>
            <li>Compresseur: {this.state.Signalement_H2.Compresseur}</li>
            <li>Comptage Passagers: {this.state.Signalement_H2["Comptage Passagers"]}</li>
            <li>Detection Incendie: {this.state.Signalement_H2["Detection Incendie"]}</li>
            <li>EMCO: {this.state.Signalement_H2.EMCO}</li>
            <li>EQS: {this.state.Signalement_H2.EQS}</li>
            <li>Eclairage: {this.state.Signalement_H2.Eclairage}</li>
            <li>Frein: {this.state.Signalement_H2.Frein}</li>
            <li>Lecteur Badge: {this.state.Signalement_H2["Lecteur Badge"]}</li>
            <li>Porte: {this.state.Signalement_H2.Porte}</li>
            <li>Pupitre: {this.state.Signalement_H2.Pupitre}</li>
            <li>Sonorisation: {this.state.Signalement_H2.Sonorisation}</li>
            <li>TCMS: {this.state.Signalement_H2.TCMS}</li>
            <li>Traction: {this.state.Signalement_H2.Traction}</li>
            <li>Total de SET en H2: {this.state.Signalement_H2["Nombre de SET en H2"]}</li>
            <li>Total de CBM en H2: {this.state.Signalement_H2["Nombre de CBM en H2"]}</li>
          </ul>
          <br/>
          <h2>Nombre de systeme en H3</h2>
          <ul>
            <li>ATESS: {this.state.Signalement_H3.ATESS}</li>
            <li>Afficheur: {this.state.Signalement_H3.Afficheur}</li>
            <li>BS: {this.state.Signalement_H3.BS}</li>
            <li>CCTV: {this.state.Signalement_H3.CCTV}</li>
            <li>Climatisation: {this.state.Signalement_H3.Climatisation}</li>
            <li>Compresseur: {this.state.Signalement_H3.Compresseur}</li>
            <li>Comptage Passagers: {this.state.Signalement_H3["Comptage Passagers"]}</li>
            <li>Detection Incendie: {this.state.Signalement_H3["Detection Incendie"]}</li>
            <li>EMCO: {this.state.Signalement_H3.EMCO}</li>
            <li>EQS: {this.state.Signalement_H3.EQS}</li>
            <li>Eclairage: {this.state.Signalement_H3.Eclairage}</li>
            <li>Frein: {this.state.Signalement_H3.Frein}</li>
            <li>Lecteur Badge: {this.state.Signalement_H3["Lecteur Badge"]}</li>
            <li>Porte: {this.state.Signalement_H3.Porte}</li>
            <li>Pupitre: {this.state.Signalement_H3.Pupitre}</li>
            <li>Sonorisation: {this.state.Signalement_H3.Sonorisation}</li>
            <li>TCMS: {this.state.Signalement_H3.TCMS}</li>
            <li>Traction: {this.state.Signalement_H3.Traction}</li>
            <li>Total de SET en H3: {this.state.Signalement_H3["Nombre de SET en H3"]}</li>
            <li>Total de CBM en H3: {this.state.Signalement_H3["Nombre de CBM en H3"]}</li>
          </ul>
          <br/>
          <h2>Nombre de systeme en H4</h2>
          <ul>
            <li>ATESS: {this.state.Signalement_H4.ATESS}</li>
            <li>Afficheur: {this.state.Signalement_H4.Afficheur}</li>
            <li>BS: {this.state.Signalement_H4.BS}</li>
            <li>CCTV: {this.state.Signalement_H4.CCTV}</li>
            <li>Climatisation: {this.state.Signalement_H4.Climatisation}</li>
            <li>Compresseur: {this.state.Signalement_H4.Compresseur}</li>
            <li>Comptage Passagers: {this.state.Signalement_H4["Comptage Passagers"]}</li>
            <li>Detection Incendie: {this.state.Signalement_H4["Detection Incendie"]}</li>
            <li>EMCO: {this.state.Signalement_H4.EMCO}</li>
            <li>EQS: {this.state.Signalement_H4.EQS}</li>
            <li>Eclairage: {this.state.Signalement_H4.Eclairage}</li>
            <li>Frein: {this.state.Signalement_H4.Frein}</li>
            <li>Lecteur Badge: {this.state.Signalement_H4["Lecteur Badge"]}</li>
            <li>Porte: {this.state.Signalement_H4.Porte}</li>
            <li>Pupitre: {this.state.Signalement_H4.Pupitre}</li>
            <li>Sonorisation: {this.state.Signalement_H4.Sonorisation}</li>
            <li>TCMS: {this.state.Signalement_H4.TCMS}</li>
            <li>Traction: {this.state.Signalement_H4.Traction}</li>
            <li>Total de SET en H4: {this.state.Signalement_H4["Nombre de SET en H4"]}</li>
            <li>Total de CBM en H4: {this.state.Signalement_H4["Nombre de CBM en H4"]}</li>
          </ul>
      </div>
    )
  }
}

export default Rexmat