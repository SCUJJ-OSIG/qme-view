/*
 * Copyright (c) 2022. TalexDreamSoul
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BaseModel } from '~/plugins/model/BaseModel'

class OrganizationModel extends BaseModel {

    constructor() {
        super("org")
    }

    info(id: number) {
        return this._get('info/' + id)
    }

    list() {
        return this._get('list')
    }

    create(data: any) {
        return this._post('create', data)
    }

    edit(id: number, data: any) {
        return this._post('update', {
            id, ...data
        })
    }

    invite(org_id: number, user_id: number) {
        return this._post('invite/' + org_id, {
            user_id
        })
    }

}

export const organizationModel = new OrganizationModel()
