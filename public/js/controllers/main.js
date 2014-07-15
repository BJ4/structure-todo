angular.module('todoController', [])
	.controller('mainController', function($scope, $http, yoTodos) {
		$scope.formData = {};

		yoTodos.get()
			.success(function(data) {
				$scope.todos = data;
			});

		$scope.createTodo = function() {
			if(!$.isEmptyObject($scope.formData)) {
				yoTodos.create($scope.formData)
					.success(function(data) {
						$scope.formData = {};
						$scope.todos = data;
					});
			}
		};

		$scope.deleteTodo = function(id) {
			yoTodos.delete(id)
				.success(function(data) {
					$scope.todos = data;
				});
		};
	});