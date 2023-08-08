import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';
import { Unsub } from 'src/app/classes/unsub';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-select',
  templateUrl: './group-select.component.html',
  styleUrls: ['./group-select.component.css']
})
export class GroupSelectComponent extends Unsub implements OnInit {
  groups: Group[] = [];
  userId: number;
  newGroup: Group = new Group;  
  createGroupBool: boolean = false;

  constructor(private groupService: GroupService, private router: Router) { super(); }

  ngOnInit(): void {
    this.getUsersGroups()
  }

  selectGroup(groupId: number)
  {
    this.router.navigate(['/groupHome/', groupId]);
  }

  createGroupBoolChange()
  {
    this.createGroupBool = !this.createGroupBool;
  }

  getUsersGroups()
  {
    this.userId = Number(localStorage.getItem('userid'));
    this.groupService.getUserGroups(this.userId).pipe(takeUntil(this.unsubscribe$)).subscribe(groups => 
      {
        this.groups = groups;
      });
  };

  createGroup() {
    this.newGroup.groupId = null;
    this.userId = Number(localStorage.getItem('userid'));
    console.log(this.newGroup);
    
    this.groupService.addGroup(this.userId, this.newGroup).subscribe(group => {
      this.newGroup.groupName = '';
      this.createGroupBoolChange();
      this.updateGroupList(group);
    })
  }

  updateGroupList(group: Group) {
    this.groups.unshift(group)
  }
}
