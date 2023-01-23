import { Component, OnInit } from '@angular/core';
import { InsertUserService } from '../services/insert-user.service';
import { UserInsert, Permission } from '../models';

@Component({
  selector: 'app-insert-user',
  templateUrl: './insert-user.component.html',
  styleUrls: ['./insert-user.component.css']
})
export class InsertUserComponent implements OnInit {

  username: string;
  password: string;
  firstName: string;
  lastName: string;
  permissions: [Permission];
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  includePermissions: string[];

  permissionCreate: string;
  permissionRead: string;
  permissionUpdate: string;
  permissionDelete: string;

  constructor(private insertUserService: InsertUserService) {
      this.username = insertUserService.getUsername();
      this.password = insertUserService.getPassword();
      this.firstName = insertUserService.getFirstName();
      this.lastName = insertUserService.getLastName();
      this.permissions = insertUserService.getPermissions();
      this.create = insertUserService.getCreate();
      this.read = insertUserService.getRead();
      this.update = insertUserService.getUpdate();
      this.delete = insertUserService.getDelete();
      this.includePermissions = insertUserService.getIncludedPermissions();
      this.permissionCreate = '';
      this.permissionUpdate = '';
      this.permissionRead = '';
      this.permissionDelete = '';
  }

  ngOnInit(): void {
  }

  insertUser() {
    this.insertUserService.setIncludedPermissions([]);
    this.insertUserService.setPermissions(this.permissions);
    this.insertUserService.setLastName(this.lastName);
    this.insertUserService.setFirstName(this.firstName);
    this.insertUserService.setUsername(this.username);
    this.insertUserService.setPassword(this.password);
    this.insertUserService.setCreate(this.create);
    this.insertUserService.setRead(this.read);
    this.insertUserService.setUpdate(this.update);
    this.insertUserService.setDelete(this.delete);

    this.permissionCreate = this.permisijeCrt(this.create);
    this.permissionRead = this.permisijeRd(this.read);
    this.permissionUpdate = this.permisijeUpd(this.update);
    this.permissionDelete = this.permisijeDlt(this.delete);

    this.loopPermissions(this.insertUserService.getIncludedPermissions());

    console.log(this.insertUserService.getIncludedPermissions());
    let user: UserInsert = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        password: this.password,
        permissions: this.loopPermissions(this.insertUserService.getIncludedPermissions())
    };
    console.log(user);
    this.insertUserService.insertUser(user).subscribe(
        (user: any) => {
          console.log(user);
        }
    );
  }

  loopPermissions(permissions: string[]): Permission[] {
    let perm = [] as Array<Permission>;
    for(let i of permissions) {
      let l = {
        permission: i
      }
      perm.push(l);
    }
    return perm;
  }

  changeValue(value: boolean) {
      this.insertUserService.setCleanField(value);
      return ' [' + value + ']';
    }

  permisijeCrt(crt: boolean) {
    if(crt) {
      return 'CAN_CREATE_USER';
    }
    return '';
  }

  permisijeRd(rd: boolean) {
    if(rd) {
      return 'CAN_READ_USER';
    }
    return '';
  }

  permisijeUpd(upd: boolean) {
    if(upd) {
      return 'CAN_UPDATE_USER';
    }
    return '';
  }

  permisijeDlt(dlt: boolean) {
    if(dlt) {
       return 'CAN_DELETE_USER';
    }
    return '';
  }


}
