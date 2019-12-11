import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { ShipType } from "src/app/model/shipyard/ShipType";
import { MainService } from "src/app/main.service";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent implements OnInit {
  validateForm: FormGroup;
  unlockedTypes = new Array<ShipType>();

  constructor(private fb: FormBuilder, public ms: MainService) {}

  ngOnInit(): void {
    this.unlockedTypes = this.ms.game.shipyardManager.shipTypes.filter(
      t => t.unlocked
    );
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      type: [1, [Validators.required]]
    });
    this.getRandomName();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.ms.game.shipyardManager.addDesign(
        this.getName(),
        this.validateForm.get("type").value
      );
    }
  }

  getRandomName(event?: MouseEvent) {
    this.validateForm.patchValue({ name: "ciao" });
    if (event) event.preventDefault();
  }
  removeName() {
    this.validateForm.patchValue({ name: "" });
  }
  getName(): string {
    return this.validateForm.get("name").value;
  }
  getTypeId(index: number, shipType: ShipType) {
    return shipType.id;
  }
}