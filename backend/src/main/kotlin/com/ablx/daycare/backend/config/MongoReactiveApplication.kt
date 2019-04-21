package com.ablx.daycare.backend.config

import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoClients
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories


@EnableReactiveMongoRepositories
class MongoReactiveApplication : AbstractReactiveMongoConfiguration() {
    override fun reactiveMongoClient(): MongoClient =
            MongoClients.create()


    override fun getDatabaseName(): String {
        return "reactive"
    }
}