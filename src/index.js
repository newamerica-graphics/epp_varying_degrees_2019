import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SingleChart from './SingleChart';

const chartSettings = {
  viz__varyingdegrees__fullApp: {
    props: {
      demographicKeys: ['Total'],
      questionGroup: 'Americans believe well-paying jobs require education after high school.',
      questionIds: ["3D", "3E"]
    },
    chart: App
  },

  viz__varyingdegrees__figure1: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['3E']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure2: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['3D']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure3: {
    props: {
      demographicKeys: ['Total', 'Party ID'],
      questionIds: ['3E']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure4: {
    props: {
      demographicKeys: ['Total', 'Party ID'],
      questionIds: ['3D']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure5: {
    props: {
      demographicKeys: ['Total','Race'],
      questionIds: ['3E']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure6: {
    props: {
      demographicKeys: ['Total','Race'],
      questionIds: ['3D']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure7: {
    props: {
      demographicKeys: ['Total','Generation'],
      questionIds: ['3D','3E']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure8: {
    props: {
      demographicKeys: ['Total',],
      questionIds: ['']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure9: {
    props: {
      demographicKeys: ['Total',],
      questionIds: [6]
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure10: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['10H']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure11: {
    props: {
      demographicKeys: ['Total',],
      questionIds: ['3F']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure12: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['3H']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure13: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: [6]
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure14: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: ['10H']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure15: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: ['3H']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure16: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: ['3F']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure17: {
    props: {
      demographicKeys: ['Total','Education Level'],
      questionIds: ['3F']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure18: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['10A']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure19: {
    props: {
      demographicKeys: ['Total'],
      questionIds: [11]
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure20: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['10B']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure21: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['10C']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure22: {
    props: {
      demographicKeys: ['Total'],
      questionIds: [7]
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure23: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: ['10A']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure24: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: [11]
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure25: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: ['10B']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure26: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: ['10C']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure27: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: [7]
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure28: {
    props: {
      demographicKeys: ['Total','Education Level'],
      questionIds: [7]
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure29: {
    props: {
      demographicKeys: ['Total','Generation'],
      questionIds: ['10A']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure30: {
    props: {
      demographicKeys: ['Total','Generation'],
      questionIds: [7]
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure31: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['5A_3','5B_3','5C_3','5D_3']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure32: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['5A_1','5B_1','5C_1','5D_1']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure33: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['5A_4','5B_4','5C_4','5D_4']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure34: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['5A_2','5B_2','5C_2','5D_2']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure35: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: ['5A_3','5B_3','5C_3','5D_3']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure36: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: ['5A_1','5B_1','5C_1','5D_1']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure37: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: ['5A_4','5B_4','5C_4','5D_4']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure38: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: ['5A_2','5B_2','5C_2','5D_2']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure39: {
    props: {
      demographicKeys: ['Total','Race'],
      questionIds: ['5A_1','5B_1','5C_1','5D_1']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure39_5: {
    props: {
      demographicKeys: ['Total', 'Race'],
      questionIds: ['5A_4','5B_4','5C_4','5D_4']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure40: {
    props: {
      demographicKeys: ['Total','Race'],
      questionIds: ['5A_3','5B_3','5C_3','5D_3']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure41: {
    props: {
      demographicKeys: ['Total','Education Level'],
      questionIds: ['5A_1','5B_1','5C_1','5D_1']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure42: {
    props: {
      demographicKeys: ['Total','Education Level'],
      questionIds: ['5A_3','5B_3','5C_3','5D_3']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure43: {
    props: {
      demographicKeys: ['Total','Education Level'],
      questionIds: ['5A_2','5B_2','5C_2','5D_2']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure44: {
    props: {
      demographicKeys: ['Total','Generation'],
      questionIds: ['5A_3','5B_3','5C_3','5D_3']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure45: {
    props: {
      demographicKeys: ['Total','Generation'],
      questionIds: ['5A_2','5B_2','5C_2','5D_2']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure46: {
    props: {
      demographicKeys: ['Total','Generation'],
      questionIds: ['5A_1','5B_1','5C_1','5D_1']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure47: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['10I']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure48: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: ['10I']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure49: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['10D']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure50: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: ['10D']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure51: {
    props: {
      demographicKeys: ['Total'],
      questionIds: [8]
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure52: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['10E']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure53: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['10F']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure54: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['10G']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure55: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: [8]
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure56: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: ['10E']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure57: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: ['10F']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure58: {
    props: {
      demographicKeys: ['Total','Party ID'],
      questionIds: ['10G']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure59: {
    props: {
      demographicKeys: ['Total','Race'],
      questionIds: [8]
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure60: {
    props: {
      demographicKeys: ['Total','Race'],
      questionIds: ['10F']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure61: {
    props: {
      demographicKeys: ['Total','Race'],
      questionIds: ['10G']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure62: {
    props: {
      demographicKeys: ['Total','Education Level'],
      questionIds: ['10E']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure63: {
    props: {
      demographicKeys: ['Total',],
      questionIds: ['']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure64: {
    props: {
      demographicKeys: ['Total','Generation'],
      questionIds: [8]
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure65: {
    props: {
      demographicKeys: ['Total','Generation'],
      questionIds: ['10E']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure66: {
    props: {
      demographicKeys: ['Total','Generation'],
      questionIds: ['10F']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__figure67: {
    props: {
      demographicKeys: ['Total','Generation'],
      questionIds: ['10G']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc1: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: ['3D']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc2: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: ['3E']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc3: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: [6]
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc4: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: ['10H']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc5: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: ['3F']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc6: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: ['3H']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc7: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: ['10A']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc8: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: ['10B']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc9: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: ['5A_3','5B_3','5C_3','5D_3']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc10: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: ['5A_1','5B_1','5C_1','5D_1']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc11: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: ['5A_2','5A_4','5B_2','5B_4','5C_2','5C_4','5D_2','5D_4']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc12: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: ['10G']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc13: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: ['10I']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc14: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: ['10D']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc15: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: [8]
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc16: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: ['10E']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc17: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: ['10F']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__nc18: {
    props: {
      demographicKeys: ['Total','North Carolina'],
      questionIds: ['10G']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__pvr1: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['4A']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__pvr2: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['4D']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__pvr3: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['4E']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__pvr4: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['4G']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__pvr5: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['4H']
    },
    chart: SingleChart
  },

  viz__varyingdegrees__pvr6: {
    props: {
      demographicKeys: ['Total'],
      questionIds: ['4J']
    },
    chart: SingleChart
  }

}

window.renderDataViz = (el) => {
  if(!(el instanceof HTMLElement)){
    console.warn('Must pass an HTML element to renderDataViz function');
    return;
  }
  let id = el.getAttribute('id');
  let settings = chartSettings[id];
  if(!settings){
    console.warn(`No chart defined with id: ${id}`);
    return;
  }
  ReactDOM.render(
    <settings.chart {...settings.props} />,
    el
  );
}
