import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  option1: any;

  ngOnInit() {
   this.drop({
     id: '#dragDiv',
     handler: '.handlder'
   });
   this.option1 = {
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
    },
    color: ['#6ca3fb', '#f1686a'],
    series: [
        {
            name: '预警企业分析结果类型占比',
            type: 'pie',

            center: ['100', '75'],
            radius: ['50%', '60%'],
            avoidLabelOverlap: true,
            label: {
                normal: {
                    show: false,
                    padding: [0, 0, 0, -10],
                    position: 'outside',
                    formatter: '{d}%'
                }
            },
            labelLine: {
                normal: {
                    show: false,
                    length: 10,
                    length2: 1,
                }
            },
            data: [
                { value: 0, name: '正常企业' },
                { value: 0, name: '预警企业' },
            ]
        }
    ]
};
  }

  onChartInit(e) {

  }


  drop(config) {
    let myConfig = {
      id : '',
      handler : '',
    };
    myConfig = _.cloneDeep(config);
    function getElement(selecter: string): any {
      if (_.indexOf(selecter, '#', 0) !== -1) {
        selecter = selecter.replace('#', '');
        return document.getElementById(selecter);
      }else if (_.indexOf(selecter, '.', 0) !== -1) {
        selecter = selecter.replace('.', '');
        const results = document.getElementsByClassName(selecter);
        return results.length > 0 ? results[0] : null;
      }else {
        return document.getElementsByTagName(selecter);
      }
    }
    const div = getElement(myConfig.id); // 获取DIV对象
    const handler = getElement(myConfig.handler); // 获取DIV对象
    handler.onmousedown = function (e) {
      e.preventDefault();
      const event1: any = e || window.event;                  // IE、火狐获取事件对象
      const eventX = event1.offsetX || event1.layerX;         // 获取鼠标相对于事件源的X轴
      const eventY = event1.offsetY || event1.layerY;        // 获取鼠标相对于事件源的Y轴
      let flag = true;
      window.onmousemove = function (mouseEvent) {
        if (flag) {
          const event2: any = mouseEvent || window.event;
          const eveX = event2.clientX;             // 获取鼠标相对于浏览器x轴的位置
          const eveY = event2.clientY;             // 获取鼠标相对于浏览器Y轴的位置
          div.style.top = eveY - eventY + 'px';
          div.style.left = eveX - eventX + 'px';
        }
      };
      this.onmouseleave = function (mouseEvent) {
        if (flag) {
          const event2: any = mouseEvent || window.event;
          const eveX = event2.clientX;             // 获取鼠标相对于浏览器x轴的位置
          const eveY = event2.clientY;             // 获取鼠标相对于浏览器Y轴的位置
          this.style.top = eveY - eventY + 'px';
          this.style.left = eveX - eventX + 'px';
        }
      };
      this.onmouseup = function () {
        this.onmousemove = null;
        this.onmouseup = null;
        flag = false;
      };
    };
  }
  }
