import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { MainService } from "../main.service";
import { Research } from "../model/researches/research";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { Subscription } from "rxjs";
import { RESEARCH_TYPES, IJobType } from "../model/data/iResearchData";

@Component({
  selector: "app-laboratory",
  templateUrl: "./laboratory.component.html",
  styleUrls: ["./laboratory.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaboratoryComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  constructor(public ms: MainService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.reloadUi();

    this.subscriptions.push(
      this.ms.updateEmitter.subscribe(() => {
        this.reloadUi();
        this.cd.markForCheck();
      })
    );
  }

  reloadUi() {
    for (const key in RESEARCH_TYPES) {
      if (key) {
        const resType = RESEARCH_TYPES[key];
        if (resType) resType.bonus.reloadBonusUi();
      }
    }
  }

  getResId(index: number, research: Research) {
    return research.id;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getTypeId(num: number, data: IJobType) {
    return data.id;
  }
}