﻿using System;
using System.Linq;
using Domain.App;
using Domain.App.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

 namespace DAL.App.EF.Helpers
{
    public class DataInitializers
    {

        public static void MigrateDatabase(AppDbContext context)
        {
            context.Database.Migrate();
        }

        public static void DeleteDatabase(AppDbContext context)
        {
            context.Database.EnsureDeleted();
        }


        public static void SeedData(AppDbContext context)
        {
        var hunterBases = new HunterBase[]
        {
            new HunterBase()
            {
                NameOfBase = "Hunters first base",
                Coins = 1000,
                LevelOfBase = 1,
                AppUserId = Guid.Parse("00000000-0000-0000-0000-000000000139"),
                Id = new Guid("00000000-0000-0000-0000-000000000001")
            }, 
        };
        foreach (var hunterBase in hunterBases)
        {
            if (!context.HunterBases.Any(l => l.Id == hunterBase.Id))
            {
                context.HunterBases.Add(hunterBase);
            }
        }     
        
        var shopBuildings = new ShopBuilding[]
        {
            new ShopBuilding()
            {
                NameOfBuilding = "Hunter hut",
                MaxHealth = 50,
                LevelOfBuilding = 1,
                BuildingType = 1,
                Price = 100,
                Id = new Guid("00000000-0000-0000-0000-000000000002")
            },
            new ShopBuilding()
            {
                NameOfBuilding = "Cannon tower",
                MaxHealth = 45,
                LevelOfBuilding = 1,
                BuildingType = 2,
                RangeOfBuilding = 3,
                AttackDamage = 10,
                AttackType = 4,
                AttackSpeed = 2,
                Price = 200,
                Id = new Guid("00000000-0000-0000-0000-000000000003")
            },
            new ShopBuilding()
            {
                NameOfBuilding = "Archer tower",
                MaxHealth = 30,
                LevelOfBuilding = 1,
                BuildingType = 2,
                RangeOfBuilding = 5,
                AttackDamage = 8,
                AttackType = 1,
                AttackSpeed = 100,
                Price = 210,
                Id = new Guid("00000000-0000-0000-0000-000000000004")
            },
            new ShopBuilding()
            {
                NameOfBuilding = "Nuclear Hornet",
                MaxHealth = 80,
                LevelOfBuilding = 1,
                BuildingType = 2,
                RangeOfBuilding = 5,
                AttackDamage = 15,
                AttackType = 6,
                AttackSpeed = 400,
                Price = 400,
                Id = new Guid("00000000-0000-0000-0000-000000000005")
            }, 
        };
        foreach (var shopBuilding in shopBuildings)
        {
            if (!context.ShopBuildings.Any(l => l.Id == shopBuilding.Id))
            {
                context.ShopBuildings.Add(shopBuilding);
            }
        }
        
        var buildings = new Building[]
        {
            new Building()
            {
                NameOfBuilding = "Hunter hut",
                MaxHealth = 50,
                LevelOfBuilding = 1,
                BuildingType = 1,
                XCoordinate = 2,
                YCoordinate = 2,
                HunterBaseId = hunterBases[0].Id,
                HunterBase = hunterBases[0],
                Id = new Guid("00000000-0000-0000-0000-000000000006")
            },
            new Building()
            {
                NameOfBuilding = "Cannon tower",
                MaxHealth = 45,
                LevelOfBuilding = 1,
                BuildingType = 2,
                XCoordinate = 5,
                YCoordinate = 5,
                RangeOfBuilding = 3,
                AttackDamage = 10,
                AttackType = 4,
                AttackSpeed = 500,
                HunterBaseId = hunterBases[0].Id,
                HunterBase = hunterBases[0],
                Id = new Guid("00000000-0000-0000-0000-000000000007")
            }, 
        };
        foreach (var building in buildings)
        {
            if (!context.Buildings.Any(l => l.Id == building.Id))
            {
                context.Buildings.Add(building);
            }
        }

        
        var heroes = new Hero[]
        {
            new Hero()
            {
                NameOfHero = "Hero test",
                MaxHealth = 50,
                AttackDamage = 5,
                LevelOfHero = 1,
                HunterBaseId = hunterBases[0].Id,
                HunterBase = hunterBases[0],
                Id = new Guid("00000000-0000-0000-0000-000000000008")
            }, 
        };
        foreach (var hero in heroes)
        {
            if (!context.Heroes.Any(l => l.Id == hero.Id))
            {
                context.Heroes.Add(hero);
            }
        }
        context.SaveChanges();
        
        }
    

public static void SeedIdentity(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, AppDbContext context)
{
 var roles = new (string roleName, string roleDisplayName)[]
 {
     ("user", "User"),
     ("admin", "Admin")
 };

 foreach (var (roleName, roleDisplayName) in roles)
 {
     var role = roleManager.FindByNameAsync(roleName).Result;
     if (role == null)
     {
         role = new AppRole()
         {
             Name = roleName,
             DisplayName = roleDisplayName
         };

         var result = roleManager.CreateAsync(role).Result;
         if (!result.Succeeded)
         {
             throw new ApplicationException("Role creation failed!");
         }
     }
 }


 var users = new (string name, string password, string firstName, string lastName, string PhoneNumber, Guid Id)[]
 {
     ("juss@gmail.com", "Password123+", "Juss", "Jussike", "1234567890", new Guid("00000000-0000-0000-0000-000000000139")),
 };

 foreach (var userInfo in users)
 {
     var user = userManager.FindByEmailAsync(userInfo.name).Result;
     if (user == null)
     {
         user = new AppUser()
         {
             Id = userInfo.Id,
             Email = userInfo.name,
             UserName = userInfo.name,
             FirstName = userInfo.firstName,
             LastName = userInfo.lastName,
             PhoneNumber = userInfo.PhoneNumber,
             EmailConfirmed = true,
             HunterBase = context.HunterBases.Find(Guid.Parse("00000000-0000-0000-0000-000000000001"))
         };
         var result = userManager.CreateAsync(user, userInfo.password).Result;
         if (!result.Succeeded)
         {
             throw new ApplicationException("User creation failed!");
         }
     }

     var roleResult = userManager.AddToRoleAsync(user, "admin").Result;
     roleResult = userManager.AddToRoleAsync(user, "user").Result;
 }
}
}
}