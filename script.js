var chart;
d3.csv(
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRf3zKI04mZK7ObRF5NJ6MzwrHbaf3CC2V4Zc_8PJciR5OaPj3i9y_pOVnTzRXS8F39L8AWlLh0vJyf/pub?gid=0&single=true&output=csv'
).then((dataFlattened) => {
  const mappedData = dataFlattened.map((d) => {
    const width = Math.round(Math.random() * 50 + 300);
    const height = Math.round(Math.random() * 20 + 130);
    const cornerShape = ['ORIGINAL', 'ROUNDED', 'CIRCLE'][
      Math.round(Math.random() * 2)
    ];
    const nodeImageWidth = 100;
    const nodeImageHeight = 100;
    const centerTopDistance = 0;
    const centerLeftDistance = 0;
    const expanded = false; //d.id=="O-6"

    const titleMarginLeft = nodeImageWidth / 2 + 20 + centerLeftDistance;
    const contentMarginLeft = width / 2 + 25;
    return {
      nodeId: d.id,
      parentNodeId: d.parentId,
      width: width,
      height: height,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: {
        red: 15,
        green: 140,
        blue: 121,
        alpha: 1,
      },
      backgroundColor: {
        red: 51,
        green: 182,
        blue: 208,
        alpha: 1,
      },
      nodeImage: {
        url: d.imageUrl,
        width: nodeImageWidth,
        height: nodeImageHeight,
        centerTopDistance: centerTopDistance,
        centerLeftDistance: centerLeftDistance,
        cornerShape: cornerShape,
        shadow: false,
        borderWidth: 0,
        borderColor: {
          red: 19,
          green: 123,
          blue: 128,
          alpha: 1,
        },
      },
      nodeIcon: {
        icon: 'https://to.ly/1yZnX',
        size: 30,
      },
      template: `<div>
            <div style="margin-left:${titleMarginLeft}px;
                        margin-top:10px;
                        font-size:15px;
                        font-weight:bold;
                   ">${d.name} </div>

           <div style="margin-left:${titleMarginLeft}px;
                        margin-top:3px;
                        font-size:13px;
                   ">${d.positionName} </div>

           <div style="margin-left:${titleMarginLeft}px;
                        margin-top:3px;
                        font-size:12px;
                   ">${d.area}</div>
           </div>
        </div>`,
      connectorLineColor: {
        red: 220,
        green: 189,
        blue: 207,
        alpha: 1,
      },
      connectorLineWidth: 5,
      dashArray: '',
      expanded: expanded,
    };
  });

  chart = new d3.OrgChart()
    .container('.chart-container')
    .data(mappedData)
    .nodeWidth((n) => 250)
    .nodeHeight((n) => 80)
    .compactMarginBetween((d) => 50)
    .siblingsMargin((d) => 120)
    .nodeContent((d) => {
      return `
        <div class="outer-wrapper" style="padding-left:70px;padding-top:0px;background-color:#E1E5EC;width:${d.width - 70
        }px;height:${d.height}px">
          <img style="border-radius:20px;margin-left:-100px;margin-top:-30px" width=50 height=50 src="${d.data.nodeImage.url
        }"/>
          <div  style="margin-left:-70px;margin-top:-40px;border-radius:5px;color:white;background-color:#4C87B9;width:${d.width
        }px;  height:${d.height}px">
             <div style="margin-left:-30px;padding-top:2px">${d.data.template
        }</div>
          
          </div>

          
        `;
    })
    .render();
});