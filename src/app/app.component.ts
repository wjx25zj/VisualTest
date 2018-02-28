import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var layui: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  option1: any;

  ngOnInit() {
    layui.use(['element', 'layer'], function(){
      const element = layui.element;

    });
  }

  ngAfterViewInit() {
    layui.use(['element', 'layer'], function(a,b){
      const layer = layui.layer;
      // layer.load(1);
    });
  }
  }
