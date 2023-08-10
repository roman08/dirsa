import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group.mode';
import { GroupService } from 'src/app/services/group.service';
import { CreateGroupComponent } from './complements/create-group/create-group.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];
  isLoading = false;

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private _srvGroup: GroupService
  ) {}

  ngOnInit(): void {
    this.getGoups();
  }

  getGoups() {
    this.isLoading = true;

    this._srvGroup.getGroups().subscribe((res) => {
      this.groups = [];
      this.groups = res['data'];
      this.isLoading = false;
    });
  }

  openDialog(): void {
    let dialogRef = this.matDialog.open(CreateGroupComponent, {
      height: '370px',
      // width: '600px',
      data: { name: 'algo' },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  createGroup() {
    this.router.navigateByUrl('/dashboard/crear-grupo');
  }

  delete(id: number) {
    this._srvGroup.delete(id).subscribe((res) => {
      if (res.status === 'success') {
        swal.fire('DIRSA', res.message, 'success');
        this.getGoups();
      } else {
        swal.fire('DIRSA', res.message, 'error');
      }
    });
  }
}
