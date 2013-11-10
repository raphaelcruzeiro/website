# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu"
    config.vm.network :forwarded_port, guest: 8001, host: 8002
end
