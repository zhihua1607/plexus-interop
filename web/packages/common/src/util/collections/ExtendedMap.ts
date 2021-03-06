/**
 * Copyright 2017-2018 Plexus Interop Deutsche Bank AG
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import 'core-js/es6/map';

export class ExtendedMap<K, V> extends Map<K, V> {

    private constructor() {
        super();
    }

    public static create<K, V>(): ExtendedMap<K, V> {
        const instance: any = new Map<K, V>();
        // tslint:disable-next-line:no-string-literal
        instance['__proto__'] = ExtendedMap.prototype;
        return instance as ExtendedMap<K, V>;
    }

    public valuesArray(): V[] {
        const res: V[] = [];
        this.forEach(v => res.push(v));
        return res;
    }

    public getOrAdd(key: K, producer: () => V): V {
        let res = this.get(key);
        if (res === undefined) {
            res = producer();
            this.set(key, res);
        }
        return res;
    }

}