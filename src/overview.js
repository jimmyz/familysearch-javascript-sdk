/**
 * @ngdoc overview
 * @name index
 * @description
 *
 * ## Overview
 *
 * ### Goal
 *
 * The goal of this SDK is to make the FamilySearch REST endpoints easier to consume.
 * Each SDK function wraps a corresponding REST endpoint and adds *convenience functions*
 * to make navigating the response easier.
 * In addition to the convenience functions you also have access to the original response,
 * so you always have the option of navigating the response elements yourself.
 * And you can make calls not anticipated by the SDK using the *plumbing functions* described below.
 *
 * ### Features
 *
 * - Authentication can be performed with a single function call, or even automatically.
 * - The access token can be saved in a cookie and can be expired automatically.
 * - REST endpoints can be called using simple function calls that set the correct request headers and request the correct URL.
 * - GET's are automatically retried to handle transient errors.
 * - Throttling is handled - calls are automatically retried.
 * - Responses are mapped to objects or arrays of objects that have convenience functions
 * to make extracting data from the responses easier.
 * - The response object prototypes can be extended with additional functions to navigate the response json and return
 * whatever custom information is desired.
 * - The SDK works using jQuery, AngularJS, or Node.js; no other dependencies are required.
 *
 * ### Object model
 *
 * Here is a list of objects returned in the SDK function responses
 *
 * People with names and facts
 *
 * - {@link person.types.type:Person Person}
 * - {@link person.types.type:Fact Fact}
 * - {@link person.types.type:Name Name}
 *
 * Relationships between people
 *
 * - {@link person.types.type:Couple Couple}
 * - {@link person.types.type:ChildAndParents ChildAndParents}
 * - {@link person.types.type:ParentChild ParentChild} (will hopefully go away in favor of ChildAndParents)
 *
 * Ojects related to people (and relationships)
 *
 * - {@link notes.types.type:NoteRef NoteRef}
 * - {@link notes.types.type:Note Note}
 * - {@link sources.types.type:SourceRef SourceRef}
 * - {@link sources.types.type:SourceDescription SourceDescription}
 * - {@link sources.types.type:IdSourceRef IdSourceRef}
 * - {@link discussions.types.type:Discussion Discussion}
 * - {@link discussions.types.type:Comment Comment}
 * - {@link memories.types.type:MemoryRef MemoryRef}
 * - {@link memories.types.type:Memory Memory}
 * - {@link changeHistory.types.type:Change Change}
 *
 * Search & match
 *
 * - {@link searchAndMatch.types.type:SearchResult SearchResult}
 *
 * Users
 *
 * - {@link user.types.type:Agent Agent}
 * - {@link user.types.type:User User}
 *
 * ## Getting started
 *
 * To use the SDK, you need to
 *
 * 1. init the SDK; e.g., ({@link init.functions:init all options})
 * <pre>
 * FamilySearch.init({
 *   app_key: 'YOUR_ACCESS_KEY_GOES_HERE',
 *   environment: 'sandbox',
 *   // auth_callback is the URI you registered with FamilySearch.
 *   // The page does not need to exist. The URI only needs to have
 *   // the same host and port as the server running your script
 *   auth_callback: 'REDIRECT_GOES_HERE',
 *   http_function: jQuery.ajax,
 *   deferred_function: jQuery.Deferred
 * });
 * </pre>
 *
 * 2. get an access token; e.g.,
 * <pre>
 * FamilySearch.getAccessToken().then(function(response) {
 *    // now you have an access token
 * });
 * </pre>
 *
 * 3. make API calls; e.g.,
 * <pre>
 * FamilySearch.getCurrentUser().then(function(response) {
 *    // now you have the response
 * });
 * </pre>
 *
 * ### Example
 *
 * <pre>
 * FamilySearch.init({
 *   app_key: 'MY_ACCESS_KEY',
 *   environment: 'sandbox',
 *   auth_callback: 'http://localhost/auth',
 *   http_function: $.ajax,
 *   deferred_function: $.Deferred,
 * });
 *
 * FamilySearch.getAccessToken().then(function(accessToken) {
 *   FamilySearch.getCurrentUser().then(function(response) {
 *     var user = response.getUser();
 *     console.log('Hello '+user.contactName);
 *   });
 * });
 * </pre>
 *
 * ## SDK Functions return promises
 *
 * As illustrated by the example above, most SDK functions return *promises*.
 * Promises are a great way to manage asynchronous code.
 * A promise has a `then(success callback, optional error callback)` method into which you pass your
 * *callback functions*.
 * Your *success callback function* is called once the promise has been fulfilled;
 * your *error callback function* is called if the project gets rejected.
 * For more information about promises, see for example [the jQuery deferred.then() documentation](http://api.jquery.com/deferred.then/).
 *
 * Promises returned by the SDK are generated by the `deferred_function` you passed into the `init` call.
 * If the promise is fulfilled, it will call your success callback function with a single parameter containing the response data.
 * If the response is rejected, it will call your error callback function with whatever the `http_function` passed into the `init`
 * call would call it with.
 *
 * The following functions are also available on the promise
 *
 * - `getResponseHeader(header)`
 * - `getAllResponseHeaders()`
 * - `getStatusCode()`
 *
 * ### Examples
 *
 * #### jQuery
 *
 * Requires jQuery 1.8 or later.
 *
 * If you pass `jQuery.ajax` and `jQuery.Deferred` into the `FamilySearch.init` call, the returned promises
 * will have the the methods [described here](http://api.jquery.com/Types/#Promise); for example
 *
 * - `then(function(response) {}, function(jqXHR, textStatus, errorThrown) {})`
 * - `done(function(response) {})`
 * - `fail(function(jqXHR, textStatus, errorThrown) {})`
 *
 * #### AngularJS -- not yet implemented
 *
 * If you pass `$http` and `$q.defer` into the `FamilySearch.init` call, the returned promises
 * will have the methods [described here](http://docs.angularjs.org/api/ng.$q#description_the-promise-api); for example
 *
 * - `then(function(response) {}, function({data: response, status: status, headers: headers, config: config}) {})`
 * - `catch(function(response, status, headers, config) {})`
 *
 * #### Node.js -- not yet implemented
 *
 * ## Handling responses
 *
 * SDK function responses are typically json objects.
 * The SDK function calls add *convenience functions* for returning various objects from the response.
 * For example, the `getPerson('ID')` call adds a `response.getPerson()` convenience function that returns the
 * {@link person.types:type.Person Person} object from the response.
 *
 * The returned objects contain the same properties as the original response json, but they have custom constructors whose
 * prototypes add convenience functions.
 * For example, the prototype for {@link person.types:type.Person Person} objects includes `getGivenName()` and `getSurname()`
 * convenience functions for returning the person's given name and surname respectively.
 * Without these convenience functions, you would have to navigate the `parts` elements of the `nameForms` array,
 * look for a part whose `type` element is `http://gedcomx.org/Given` or `http://gedcomx.org/Surname` respectively, and
 * then return the `value` element of that part.  `getGivenName()` and `getSurname()` do this for you.
 * The object properties and convenience functions are fully described in the docs.
 *
 * You can add your own convenience functions to the returned objects.
 * For example, suppose you wanted to display someone's name followed by their id. You could write
 * <pre>
 *   FamilySearch.Person.prototype.getNameAndId = function() {
 *     return this.getName() + ' (' + this.id + ')';
 *   }
 * </pre>
 *
 * and from then on you could call `person.getNameAndId()` on any {@link person.types:type.Person Person} object.
 *
 * <pre>
 * FamilySearch.getPerson('ID').then(function(response) {
 *   var person = response.getPerson();
 *   console.log('Hello '+person.getNameAndId());
 * });
 * </pre>
 *
 * ## Plumbing
 *
 * The functions in the *plumbing* module are low-level functions that you would not normally call.
 * The higher-level API functions that you normally call are built on top of the plumbing functions.
 * The plumbing functions are exposed in case you want to do something not anticipated by the API functions.
 * Promises returned by plumbing functions call their callback functions with whatever the `http_function`
 * passed into the `init` call would call them with.
 * The plumbing functions serve the same purpose as the
 * [plumbing functions in git](https://www.kernel.org/pub/software/scm/git/docs/#_low_level_commands_plumbing).
 */
