import { describe, it } from "node:test"
import { strictEqual, throws, deepStrictEqual } from "node:assert/strict"

import Route from "../../src/core/domain/Route.js"

describe('Route', function () {

    function makeSut({ method = 'GET', path = '/api/:id' }) {
        return new Route(method, path, (req, res) => { })
    }

    it('Created Route', () => {
        const method = 'GET'
        const path = '/api/'
        const route = new Route(method, path, (req, res) => { })

        strictEqual(route.method, 'GET')
        strictEqual(route.path, '/api/')
    })

    describe('#getParameters', function () {


        it('Should return a parameters path', function () {
            const route = makeSut({})
            const fakePath = '/api/any_id'
            const parameters = route.getParameters(fakePath)
            strictEqual(parameters.id, 'any_id')
        })

        it('Should return a param path', function () {
            const fakePath = '/api/user/any_param'
            const path = '/api/user/:param'
            const route = makeSut({ path })
            const parameters = route.getParameters(fakePath)
            deepStrictEqual(parameters, { param: 'any_param' })
        })

        it('Should return a error with path invalid', function () {
            const method = 'GET'
            const path = '/api/user/:id'
            const fakePath = '/api/any_id'
            const route = new Route(method, path, (req, res) => { })
            throws(() => { route.getParameters(fakePath) }, { message: 'path length invalid' })
        })

    })

})