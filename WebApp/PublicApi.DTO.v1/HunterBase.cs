using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using BLL.App.DTO;
using ee.itcollege.carwash.kristjan.Contracts.Domain;

namespace PublicApi.DTO.v1
{
    public class HunterBase : IDomainEntityId
    {
        [Required]
        public string NameOfBase { get; set; } = default!; 
        
        public int Coins { get; set; } = default!;

        public int LevelOfBase { get; set; } = default!;
        
        private ICollection<Building>? Buildings { get; set; }
        
        private ICollection<Hero>? Heroes { get; set; }
        
        
        public Guid AppUserId { get; set; }

        public Guid Id { get; set; }
    }
}