import { Component, OnInit, Input } from "@angular/core";
import { AdminService } from "app/services/admin.service";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-state",
  templateUrl: "./state.component.html",
  styleUrls: ["./state.component.scss"],
})
export class StateComponent implements OnInit {
  i = 0;
  inputValue: string | null = null;
  editId: string | null = null;
  // private states = new BehaviorSubject<any>(null);
  // @Input() states$ = this.states.asObservable();
  states: any;
  constructor(
    private adminService: AdminService,
    private message: NzMessageService
  ) {
    adminService.stateData$.subscribe((states) => {
      this.states = states;
    });
  }

  ngOnInit() {}

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    if (this.inputValue.length == 0) {
      this.message.error("Please provide state name", { nzDuration: 2500 });
      return;
    }
    this.message.loading("Saving state ...");
    const data = { state: this.inputValue };
    this.adminService.saveState(data).subscribe((data) => {
      this.message.remove("");
      this.message.success("State save successfully");
      if (data.success) this.states = [...this.states, data.data];
      else this.message.error(data.message, { nzDuration: 2500 });
    });

    this.i++;
  }

  deleteRow(id: string): void {
    this.states = this.states.filter((d) => d.id !== id);
  }
}
