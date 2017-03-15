function KBox2d(type,pos,shape,disobj) {
    //坐标 X
    this.x = 0;
    //坐标 Y
    this.y = 0;
    //显示对象的宽度
    this.width = 0;
    //显示对象的高度
    this.height = 0;
    //X方向的锚点
    this.anchorX = 0;
    //Y方向的锚点
    this.anchorY = 0;
    //缩放大小
    this.scale = 1;
    //围绕锚点的旋转角度
    this.rotation = 0;
    //zIndex
    this.z = 0;
    //is obj alive
    this.isAlive=true;
    //事件绑定对象
    this.evtObject=null;

    this.type = type;
    this.box = null;
    this.position=pos;
    this.shape=shape;
    this.disobj = disobj;
    this.init();
}
KBox2d.isDebug = true;
KBox2d.init=function(){
    //Box2d静态参数
    var gravity = new Box2D.Common.Math.b2Vec2(0,9.8/KWRatio);
    var allowSleep = true;
    KBox2d.scale = 30;
    KBox2d.b2Vec2 = Box2D.Common.Math.b2Vec2;
    KBox2d.b2BodyDef = Box2D.Dynamics.b2BodyDef;
    KBox2d.b2Body = Box2D.Dynamics.b2Body;
    KBox2d.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    KBox2d.b2Fixture = Box2D.Dynamics.b2Fixture;
    KBox2d.b2World = Box2D.Dynamics.b2World;
    KBox2d.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    KBox2d.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    KBox2d.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    KBox2d.b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
    KBox2d.b2ContactListener = Box2D.Dynamics.b2ContactListener;
    KBox2d.world = new KBox2d.b2World(gravity,allowSleep);
};
KBox2d.EVTNAME={
    BeginContact:"BeginContact",/*任意2个物体接触就会触发 在它上面滚动也算*/
    EndContact:"EndContact",/*接触结束后触发*/
    PreSolve:"PreSolve",
    PostSolve:"PostSolve"
}
KBox2d.setListener = function(evtName,call){
    var contactListener = new  KBox2d.b2ContactListener();
    switch (evtName) {
        case "BeginContact":
            contactListener.BeginContact = call;
            break;
        case "EndContact":
            contactListener.EndContact   = call;
            break;
        case "PreSolve":
            contactListener.PreSolve     = call;
            break;
        case "PostSolve":
            contactListener.PostSolve    = call;
            break;
    }
    KBox2d.world.SetContactListener(contactListener);
    return contactListener
};
KBox2d.setupDebugDraw = function(ctx){
    if(KBox2d.isDebug) {
        var debugDraw = new KBox2d.b2DebugDraw();
        //使用canvas绘图环境 调试画面
        debugDraw.SetSprite(ctx);
        //设置绘图比例
        debugDraw.SetDrawScale(KBox2d.scale);
        //填充透明度
        debugDraw.SetFillAlpha(1);
        //线条宽度
        debugDraw.SetLineThickness(1.0);
        //绘制所有的shape joint
        debugDraw.SetFlags(KBox2d.b2DebugDraw.e_shapeBit | KBox2d.b2DebugDraw.e_jointBit);
        //设置调制绘图环境
        //KBox2d.world.SetDebugDraw(debugDraw);
    }else{
        return
    }
};

KBox2d.worldAction = function(){
    var timeStep = 1/60;
    var velocityIterations = 6;//速度迭代数
    var positionIterations = 3;//坐标迭代数
    KBox2d.world.Step(timeStep,velocityIterations,positionIterations);
    //KBox2d.world.ClearForces();
    //KBox2d.world.DrawDebugData();
    setTimeout(KBox2d.worldAction,timeStep);
};

KBox2d.prototype= {
    init: function () {
        switch (this.type) {
            case "floor":
                //矩形地板
                this.createFloor();
                break;
            case "rect":
                //矩形刚体
                this.createRectBody();
                break;
            case "circle":
                //圆形刚体
                this.createCircleBody();
                break;
        }
    },

    createFloor: function () {
        var bodyDef = new KBox2d.b2BodyDef;
        bodyDef.type = KBox2d.b2Body.b2_staticBody;//静态刚体
        bodyDef.position.x = this.position.x / KWRatio / KBox2d.scale;
        bodyDef.position.y = this.position.y / KWRatio / KBox2d.scale;

        var fixtureDef = new KBox2d.b2FixtureDef;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 3;
        fixtureDef.restitution = 0.2;

        fixtureDef.shape = new KBox2d.b2PolygonShape;
        fixtureDef.shape.SetAsBox(this.shape.width / KWRatio /2/ KBox2d.scale, this.shape.height /2/ KWRatio / KBox2d.scale);

        var body = KBox2d.world.CreateBody(bodyDef);
        var fixture = body.CreateFixture(fixtureDef);

        //body.SetPosition(100 / KWRatio / KBox2d.scale,100/ KWRatio / KBox2d.scale);
        this.box = {
            body:body,
            fixture:fixture
        }

        if(this.disobj) {
            this.disobj.anchorX = this.disobj.anchorY = 0.5;
            this.disobj.width = this.shape.width;
            this.disobj.height = this.shape.height;
        }
    },
    createRectBody: function () {
        var bodyDef = new KBox2d.b2BodyDef;
        bodyDef.type = KBox2d.b2Body.b2_dynamicBody;
        bodyDef.position.x = this.position.x / KWRatio / KBox2d.scale;
        bodyDef.position.y = this.position.y / KWRatio / KBox2d.scale;

        var fixtureDef = new KBox2d.b2FixtureDef;
        fixtureDef.density = 1;      //密度
        fixtureDef.friction = 1.5;      //摩擦力
        fixtureDef.restitution = 0.4;    //恢复

        fixtureDef.shape = new KBox2d.b2PolygonShape;
        fixtureDef.shape.SetAsBox(this.shape.width / KWRatio / KBox2d.scale, this.shape.height / KWRatio / KBox2d.scale);

        var body = KBox2d.world.CreateBody(bodyDef);
        var fixture = body.CreateFixture(fixtureDef);

        this.box = {
            body:body,
            fixture:fixture
        }
    },

    createCircleBody: function () {
        var bodyDef = new KBox2d.b2BodyDef;
        bodyDef.type = KBox2d.b2Body.b2_dynamicBody;
        bodyDef.position.x = this.position.x / KWRatio / KBox2d.scale;
        bodyDef.position.y = this.position.y / KWRatio / KBox2d.scale;

        var fixtureDef = new KBox2d.b2FixtureDef;
        fixtureDef.density = 1;      //密度
        fixtureDef.friction = 3;      //摩擦力
        fixtureDef.restitution = 0.6;    //恢复

        fixtureDef.shape = new KBox2d.b2CircleShape(this.shape.r/KWRatio/KBox2d.scale);

        var body = KBox2d.world.CreateBody(bodyDef);
        var fixture = body.CreateFixture(fixtureDef);

        this.box = {
            body:body,
            fixture:fixture
        }
        this.disobj.anchorX=this.disobj.anchorY=0.5;
        this.disobj.width = this.shape.r*2;
        this.disobj.height = this.shape.r*2;
    },

    setPosY:function(y) {
        this.box.body.SetPosition( new KBox2d.b2Vec2(this.position.x / KWRatio / KBox2d.scale,y/ KWRatio / KBox2d.scale));
    },

    setPosX:function(x) {
        this.box.body.SetPosition( new KBox2d.b2Vec2(x / KWRatio / KBox2d.scale,this.position.y/ KWRatio / KBox2d.scale));
    },

    setPos:function(x,y) {
        this.box.body.SetPosition( new KBox2d.b2Vec2(x / KWRatio / KBox2d.scale,y/ KWRatio / KBox2d.scale));
    },
    getPos: function () {
        var pos = this.box.body.GetPosition();
        return {x:pos.x*KWRatio*KBox2d.scale,y: pos.y*KWRatio*KBox2d.scale};
    },
    setSpeed:function(angle,v){
        this.box.body.SetAwake(true);
        var angle = angle;
        var v = v / KWRatio / KBox2d.scale;
        this.box.body.SetLinearVelocity(new KBox2d.b2Vec2(v*Math.cos(angle/180*Math.PI), v*Math.sin(angle/180*Math.PI)));
        this.box.body.SetAngle(angle);
    },
    addToStage: function (s) {
        s.addChild( this.disobj);
    },
    draw:function(){
        var pos = this.box.body.GetPosition();
        this.disobj.x = pos.x*KWRatio*KBox2d.scale;
        this.disobj.y = pos.y*KWRatio*KBox2d.scale;
        this.disobj.rotation=this.box.body.GetAngle()*180;
    }
}