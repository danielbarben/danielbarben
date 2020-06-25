import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import './fullpage.css';
import { IoIosArrowDropdown } from "react-icons/io";
import myKey from './data/config.js'
const SEL = 'section';
const SECTION_SEL = `.${SEL}`;

const pluginWrapper = () => {
  //require('fullpage_api.parallax'); // Optional. When using scrollOverflow:true
};

const originalColors = [];

class Fullpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionsColor: [...originalColors],
      fullpages: [
        {
        title: <h1>Daniel Barben<br/>publiziert für Sie</h1>,
        bg_id: 'bg00',
        content: [
          <a href="#Schreiben">Schreiben</a>,
          <a href="#Gestalten">Gestalten</a>,
          <a href="#Programmieren">Programmieren</a>,
          <a href="#Schreiben"><IoIosArrowDropdown/></a>
          ]
        },
        {
          title: <h1>Schreiben</h1>,
          bg_id: 'bg01',
          content: [
            'Sie wollen eine Botschaft vermitteln?',
            'Ich finde für Sie die passende Geschichte, recherchiere Themen und schreibe spannende Texte.',
            'Ich betreue selbstständig Ihren Blog, Ihre Website oder Ihr Magazin.',
          ]
        },
        {
          title: <h1>Gestalten</h1>,
          bg_id: 'bg02',
          content: [
            'Ich verpacke Ihre Botschaft in die passende Form.',
            'Komplexe Sachverhalte erkläre ich leicht verständlich mit Infografiken.',
            'Fallen Sie auf mit von mir kreativ gestalteten Websites, Flyern oder Magazinen.'
          ]
        },
        {
          title: <h1>Programmieren</h1>,
          bg_id: 'bg03',
          content: [
            'Vermitteln Sie ihre Botschaft noch eingängiger mit einem Minigame.',
            'Ich programmiere für Sie ein Quiz oder einen einfachen Chatbot.',
            'Meine interaktiven Grafiken eignen sich, um grosse Datenmengen zu präsentieren.'
          ]
        },
        {
          title: <h1>Beispiele</h1>,
          bg_id: 'bg04',
          content: [
            <a href="https://digitalorakel.ch" target='_blank' rel='noopener noreferrer'><b>digitalorakel.ch,</b> ein Chatbot</a>,
            <a href="https://berninzahlen.ch" target='_blank' rel='noopener noreferrer'><b>berninzahlen.ch,</b> ein infografischer Blick auf Bern'</a>,
            <a href="http://www.dampferfreunde.ch/de/Dampfblatt" target='_blank' rel='noopener noreferrer'><b>Dampf-Blatt,</b> ein Magazin über Dampfschiffe</a>
          ]
        },
        { 
          title: <h1>Auszeichnungen</h1>,
          bg_id: 'bg05',
          content: [
            'Malofjej Bronze Medail, 2013',
            'Grimme Online Award, 2016',
            `DPA Infografik Award, 2018 und 2013`,
            'European Newspaper Awards, zuletzt 2019'            
          ]
        },
        {
          title: <h1>Daniel Barben</h1>,
          bg_id: 'bg06',
          content: [
            'Inspiration finde ich in den Bergen und auf dem See.',
            'Ich publiziere seit 20 Jahren auf allen Kanälen.',
            'Meine Heimat ist das Berner Oberland.',
            <a href="mailto:daniel@barben.com"><b>daniel@barben.com</b></a>
          ]
        }
      ],
    };
  }

  render() {
    const { fullpages } = this.state;
    if (!fullpages.length) {
      return null;
    }
    return (
      <div className="App">
        <ReactFullpage
          navigation={false}
          verticalCentered={false}
          licenseKey = {myKey.secret}
          anchors={['willkommen', 'schreiben', 'gestalten', 'programmieren', 'beispiele', 'auszeichnungen', 'danielbarben']}
          sectionSelector={SECTION_SEL}
          sectionsColor={this.state.sectionsColor}
          pluginWrapper={pluginWrapper}
          afterLoad = {
            function(origin, destination, direction) {
              let bg_id = 'bg0' + destination.index;
              let intro = document.querySelector('#' + bg_id)
              for (let el in fullpages[destination.index].content) {
                intro.querySelector('#p' + el).style.left = 0 + 'px';
              }
            }
          }
          onLeave = {
            function(origin, destination, direction) {
              let bg_id = 'bg0' + origin.index;
              let intro = document.querySelector('#' + bg_id)
              for (let el in fullpages[origin.index].content) {
                intro.querySelector('#p' + el).style.left = -130 + '%';
              }
            }
          }

          render={comp => (
            <ReactFullpage.Wrapper>
              {fullpages.map(({title, bg_id, content}) => (
                <div key={bg_id} className={SEL} id={bg_id}>
                  {title}
                  {content.map((el, index) => (<span id={'p' + index} className='intro' key={bg_id + index}><p>{el}</p></span>))}
                </div>
              ))}
            </ReactFullpage.Wrapper>
          )}
        />
      </div>
    );
  }
}
export default Fullpage