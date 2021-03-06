//-- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2015 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
//++

import {WorkPackageResource} from 'core-app/modules/hal/resources/work-package-resource';
import {WorkPackageNotificationService} from '../../wp-edit/wp-notification.service';
import {Component, Inject, Input} from '@angular/core';
import {I18nService} from 'core-app/modules/common/i18n/i18n.service';
import {PathHelperService} from "core-app/modules/common/path-helper/path-helper.service";

@Component({
  selector: 'wp-attachment-list-item',
  templateUrl: './wp-attachment-list-item.html'
})
export class WorkPackageAttachmentListItemComponent {
  @Input('workPackage') public workPackage:WorkPackageResource;
  @Input('attachment') public attachment:any;

  public text = {
    destroyConfirmation: this.I18n.t('js.text_attachment_destroy_confirmation'),
    removeFile: (arg:any) => this.I18n.t('js.label_remove_file', arg)
  };

  constructor(protected wpNotificationsService:WorkPackageNotificationService,
              readonly I18n:I18nService,
              readonly pathHelper:PathHelperService) {
  }

  public get downloadPath() {
    return this.pathHelper.attachmentDownloadPath(this.attachment.id, this.attachment.name);
  }

  public confirmRemoveAttachment($event:JQueryEventObject) {
    if (!window.confirm(this.text.destroyConfirmation)) {
      $event.stopImmediatePropagation();
      $event.preventDefault();
      return false;
    }

    this.workPackage.removeAttachment(this.attachment);
    return false;
  }
}
