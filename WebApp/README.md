"MySqlConnection": "server=alpha.akaver.com;database=student2018_akaver_demo2019s;user=student2018;password=student2018"
"MSSQLConnection": "Server=alpha.akaver.com,1533;User Id=SA;Password=Admin.TalTech.1;Database=<your_uni-id_somerandomname>;MultipleActiveResultSets=true"

~~~
dotnet tool update --global dotnet-ef
~~~

~~~
dotnet ef migrations add InitialDbCreation --project DAL.App.EF --startup-project WebApp
dotnet ef database update --project DAL.App.EF --startup-project WebApp
dotnet ef database drop --project DAL.App.EF --startup-project WebApp
~~~



run in WebApp folder
~~~
dotnet aspnet-codegenerator controller -name CampaignsController          -actions -m Campaign          -dc AppDbContext -outDir Controllers --useDefaultLayout --useAsyncActions --referenceScriptLibraries -f
dotnet aspnet-codegenerator controller -name CarsController       -actions -m Car        -dc AppDbContext -outDir Controllers --useDefaultLayout --useAsyncActions --referenceScriptLibraries -f
dotnet aspnet-codegenerator controller -name ChecksController   -actions -m Check   -dc AppDbContext -outDir Controllers --useDefaultLayout --useAsyncActions --referenceScriptLibraries -f
dotnet aspnet-codegenerator controller -name IsInServicesController            -actions -m IsInService            -dc AppDbContext -outDir Controllers --useDefaultLayout --useAsyncActions --referenceScriptLibraries -f
dotnet aspnet-codegenerator controller -name ModelMarksController   -actions -m ModelMark    -dc AppDbContext -outDir Controllers --useDefaultLayout --useAsyncActions --referenceScriptLibraries -f
dotnet aspnet-codegenerator controller -name EOrdersController   -actions -m Order    -dc AppDbContext -outDir Controllers --useDefaultLayout --useAsyncActions --referenceScriptLibraries -f
dotnet aspnet-codegenerator controller -name PaymentsController   -actions -m Payment    -dc AppDbContext -outDir Controllers --useDefaultLayout --useAsyncActions --referenceScriptLibraries -f
dotnet aspnet-codegenerator controller -name PaymentMethodsController   -actions -m PaymentMethod    -dc AppDbContext -outDir Controllers --useDefaultLayout --useAsyncActions --referenceScriptLibraries -f
dotnet aspnet-codegenerator controller -name ServicesController   -actions -m Service    -dc AppDbContext -outDir Controllers --useDefaultLayout --useAsyncActions --referenceScriptLibraries -f
~~~

Generate Identity UI
~~~
dotnet aspnet-codegenerator identity -dc DAL.App.EF.AppDbContext  -f  
~~~


~~~
dotnet aspnet-codegenerator controller -name CampaignsController -actions -m Campaign -dc AppDbContext -outDir ApiControllers -api --useAsyncActions  -f
dotnet aspnet-codegenerator controller -name CarsController -actions -m Car -dc AppDbContext -outDir ApiControllers -api --useAsyncActions  -f
dotnet aspnet-codegenerator controller -name ChecksController -actions -m Check -dc AppDbContext -outDir ApiControllers -api --useAsyncActions  -f
dotnet aspnet-codegenerator controller -name IsInServicesController -actions -m IsInService -dc AppDbContext -outDir ApiControllers -api --useAsyncActions  -f
dotnet aspnet-codegenerator controller -name ModelMarksController -actions -m ModelMark -dc AppDbContext -outDir ApiControllers -api --useAsyncActions  -f
dotnet aspnet-codegenerator controller -name OrdersController -actions -m Order -dc AppDbContext -outDir ApiControllers -api --useAsyncActions  -f
dotnet aspnet-codegenerator controller -name PaymentsController -actions -m Payment -dc AppDbContext -outDir ApiControllers -api --useAsyncActions  -f
dotnet aspnet-codegenerator controller -namePaymentMethodsController -actions -m PaymentMethod -dc AppDbContext -outDir ApiControllers -api --useAsyncActions  -f
dotnet aspnet-codegenerator controller -name ServicesController -actions -m Service -dc AppDbContext -outDir ApiControllers -api --useAsyncActions  -f
~~~