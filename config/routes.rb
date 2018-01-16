Rails.application.routes.draw do
  devise_for :users
  root 'prototypes#index'

  resources :prototypes, only: [:index, :new, :create, :show]
  resources :users, only: [:show, :edit, :update]

  post   '/like/:prototype_id' => 'likes#create',   as: 'create'
  delete '/like/:prototype_id' => 'likes#destroy', as: 'destroy'
end
