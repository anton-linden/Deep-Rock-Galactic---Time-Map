import { Component, OnInit } from '@angular/core';
import { MissionService } from 'src/app/mission.service';
import { LocationServiceService } from 'src/app/location-service.service';

@Component({
  selector: 'app-mission-table',
  templateUrl: './mission-table.component.html',
  styleUrls: ['./mission-table.component.css']
})
export class MissionTableComponent implements OnInit {

  showingAmount: number = 0;
  amountOfMissions: number = 0;
  missions: Array<{id: number, imagePath: string, type: string, location: string, datetime: string, amount: number, length: number, complexity: number, show: boolean, mutators: Array<{hazardBonus: number, imagePath: string, mutator: number, name: string}>}> = [];
  missionsTypes: Array<{type: string, imagePath: string}> = [];

  constructor(private missionService:MissionService, private locationService: LocationServiceService) {
    this.getTableContent();
  }

  getTableContent() {
    this.missionService.getAllMissions().subscribe(data=>{
      var types = new Array();

      this.amountOfMissions = Object(data).length;
      this.showingAmount = this.amountOfMissions;

      for (let index = 0; index < Object(data).length; index++) {
        this.missionService.getTypeFromTypeId(+Object(data)[index].type).subscribe(data2=>{
          this.locationService.getLocationFromId(+Object(data)[index].location).subscribe(data3=>{

            this.missionService.getAllMutatorsForOneMission(+Object(data)[index].id).subscribe(data4=>{

            if (!types.includes(+Object(data)[index].type)) {
              types.push(+Object(data)[index].type);
              this.missionsTypes.push({
                type: Object(data2)[0].name,
                imagePath: Object(data2)[0].imagePath
              });
            }


            this.missions.push({
              id: +Object(data)[index].id,
              type: Object(data2)[0].name,
              imagePath: Object(data2)[0].imagePath,
              location: Object(data3)[0].name,
              datetime: Object(data)[index].datetime,
              amount: +Object(data)[index].amount,
              length: Object(data)[index].length,
              complexity: Object(data)[index].complexity,
              show: true,
              mutators: Object(data4)
            });

            if (+Object(data)[index].id == 1) {
              console.log(this.missions[index]);
              console.log(data4);
            }


            });
          })
        })
      }
    });
  }

  reload() {
    this.missions = [];
    this.missionsTypes = [];
    this.getTableContent();
  }

  hideMissionsWithType(type: string) {
    for (let index = 0; index < this.missions.length; index++) {
      if (type == this.missions[index].type) {
        this.missions[index].show = !this.missions[index].show;

        if (!this.missions[index].show) {
          this.showingAmount--;
        } else {
          this.showingAmount++;
        }
      }
    }
  }

  ngOnInit(): void {
  }

}

// export interface IMission {
//   missionID: number;
//   missionImagePath: string;
//   missionType: number;
//   missionLocation: string;
//   missionDateTime: string;
//   missionAmount: string;
// }
