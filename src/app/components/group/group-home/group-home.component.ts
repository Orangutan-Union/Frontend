import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { GroupService } from 'src/app/services/group.service';
import { Unsub } from 'src/app/classes/unsub';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.css']
})
export class GroupHomeComponent extends Unsub implements OnInit {
  @Output() id: EventEmitter<number> = new EventEmitter<number>();
  groupId: number;
  group: Group = new Group

  constructor(private groupService: GroupService, private route: ActivatedRoute) { super(); }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      const id = Number(params.get('id'))
      this.id.emit(id);
      this.groupId = id;
      
      this.groupService.getGroup(id).pipe(takeUntil(this.unsubscribe$)).subscribe(group =>
        {
          this.group = group;
        });
    });
  }

}
