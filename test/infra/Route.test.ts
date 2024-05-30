import { strictEqual, throws, deepStrictEqual } from "node:assert/strict"
import { describe, expect, it } from "vitest"

import Route from '../../src/shared/domain/Route'
import { Method } from "../../src/shared/infra/types"

function makeSut({ method = 'GET', path = '/api/:id' }: { method?: Method, path?: string }) {

    return new Route(method, path, (req, res) => { })
}

describe('Route', function () {

    it('Created Route', () => {
        const method = 'GET'
        const path = '/api/'
        const route = new Route(method, path, (req, res) => { })

        expect(route.method).toBe('GET')
        expect(route.path).toBe('/api/')
    })

    describe('#getParameters', function () {
        it('Should return a parameters path', function () {
            const route = makeSut({})
            const fakePath = '/api/any_id'
            const parameters = route.getParameters(fakePath)
            expect(parameters.id).toBe('any_id')
        })

        it('Should return a param path', function () {
            const fakePath = '/api/user/any_param'
            const path = '/api/user/:param'
            const route = makeSut({ path })
            const parameters = route.getParameters(fakePath)
            expect(parameters).toEqual({ param: 'any_param' })
        })

        it('Should return a error with path invalid', function () {
            const method = 'GET'
            const path = '/api/user/:id'
            const fakePath = '/api/any_id'
            const route = new Route(method, path, (req, res) => { })
            expect(() => { route.getParameters(fakePath) }).toThrowError('path length invalid')
        })

    })

})