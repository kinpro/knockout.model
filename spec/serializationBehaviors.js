
describe('Serialization', function() {
    it('_clone should return an object of just the specified keys and values', function () {
        var Intern = ko.Model.extend({
                initialize: function () {
                    var self = this;

                    this.first_name = ko.observable();
                    this.last_name = ko.observable();
                    this.age = null;
                    this.name = ko.computed(function () {
                        return self.first_name() + " " + self.last_name();
                    });
                }
            }),
            shelly = new Intern({
                first_name: 'Shelly',
                last_name: 'Frowny',
                age: 22
            });

        expect(shelly._clone()).toEqual({
            first_name: "Shelly",
            last_name: "Frowny",
            age: 22,
            name: "Shelly Frowny",
            id: null
        });
    });

    it('_clone should not return transientAttributes', function () {
        var Intern = ko.Model.extend({
                initialize: function () {
                    var self = this;

                    this.first_name = ko.observable();
                    this.last_name = ko.observable();
                    this.age = null;
                    this.name = ko.computed(function () {
                        return self.first_name() + " " + self.last_name();
                    });
                },
                transientAttributes: [
                    'first_name',
                    'last_name'
                ]
            }),
            shelly = new Intern({
                first_name: 'Shelly',
                last_name: 'Frowny',
                age: 22
            });

        expect(shelly._clone()).toEqual({
            age: 22,
            name: "Shelly Frowny",
            id: null
        });
    });

    it('_clone should return _destroy only when an instance is destroyed', function () {
        var Intern = ko.Model.extend({
                initialize: function () {
                    var self = this;

                    this.first_name = ko.observable();
                    this.last_name = ko.observable();
                    this.age = null;
                    this.name = ko.computed(function () {
                        return self.first_name() + " " + self.last_name();
                    });
                },
                transientAttributes: [
                    'first_name',
                    'last_name'
                ]
            }),
            shelly = new Intern({
                first_name: 'Shelly',
                last_name: 'Frowny',
                age: 22
            });

        expect(shelly._clone()).toEqual({
            age: 22,
            name: "Shelly Frowny",
            id: null
        });

        shelly.destroy();

        expect(shelly._clone()).toEqual({
            age: 22,
            name: "Shelly Frowny",
            id: null,
            _destroy: true
        });
    });

    it('toJS should return an object of the specified keys and values', function () {
        var Intern = ko.Model.extend({
                initialize: function () {
                    var self = this;

                    this.first_name = ko.observable();
                    this.last_name = ko.observable();
                    this.age = null;
                    this.name = ko.computed(function () {
                        return self.first_name() + " " + self.last_name();
                    });
                }
            }),
            shelly = new Intern({
                first_name: 'Shelly',
                last_name: 'Frowny',
                age: 22
            });

        expect(shelly.toJS()).toEqual({
            first_name: "Shelly",
            last_name: "Frowny",
            age: 22,
            name: "Shelly Frowny",
            id: null
        });
    });

    it('toJSON should return a JSON string of the specified keys and values', function () {
        var Intern = ko.Model.extend({
                initialize: function () {
                    var self = this;

                    this.first_name = ko.observable();
                    this.last_name = ko.observable();
                    this.age = null;
                    this.name = ko.computed(function () {
                        return self.first_name() + " " + self.last_name();
                    });
                }
            }),

            shelly = new Intern({
                first_name: 'Shelly',
                last_name: 'Frowny',
                age: 22
            });

        var output = shelly.toJSON();

        expect(typeof output).toEqual('string');
        expect(JSON.parse(output)).toEqual({
            first_name: "Shelly",
            last_name: "Frowny",
            age: 22,
            name: "Shelly Frowny",
            id: null
        });
    });


    it('parse should assume the passed value is an id if not an object', function () {
        var Intern = ko.Model.extend({
                initialize: function () {
                    var self = this;

                    this.first_name = ko.observable();
                }
            }),

            shelly = new Intern();

        var output = shelly.parse(1);

        expect(typeof output).toEqual('object');
        expect(output).toEqual({
            id: 1
        });
    });
});
