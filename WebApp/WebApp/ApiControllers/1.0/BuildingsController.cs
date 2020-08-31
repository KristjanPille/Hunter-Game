using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contracts.BLL.App;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL.App.EF;
using Domain.App;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using PublicApi.DTO.v1.Mappers;
using V1DTO=PublicApi.DTO.v1;

namespace WebApp.ApiControllers._1._0
{
    /// <summary>
    /// Buildings Api Controller
    /// </summary>
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class BuildingsController : ControllerBase
    {
        private readonly IAppBLL _bll;
        private readonly BuildingMapper _mapper = new BuildingMapper();

        public BuildingsController(AppDbContext context, IAppBLL bll)
        {
            _bll = bll;
        }

        // GET: api/Buildings
        /// <summary>
        /// Get all Buildings
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<PublicApi.DTO.v1.Building>>> GetBuildings()
        {
            return Ok((await _bll.Buildings.GetAllAsync()).Select(e => _mapper.Map(e)));
        }

        
        // GET: api/Buildings
        /// <summary>
        /// Get all Buildings
        /// </summary>
        /// <param name="hunterBaseId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("homeBase/{hunterBaseId}")]
        [Produces("application/json")]

        public async Task<ActionResult<IEnumerable<PublicApi.DTO.v1.Building>>> GetHunterBaseBuildings(Guid hunterBaseId)
        {
            return Ok((await _bll.Buildings.GetAllAsync()).Select(e => _mapper.Map(e)).Where(building => building.HunterBaseId == hunterBaseId));
        }
        
        // GET: api/Buildings/5
        /// <summary>
        /// Get Specific Building
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [Produces("application/json")]
        public async Task<ActionResult<PublicApi.DTO.v1.Building>> GetBuilding(Guid id)
        {
            var Building= await _bll.Buildings.FirstOrDefaultAsync(id);

            if (Building== null)
            {
                return NotFound(new V1DTO.MessageDTO("Building not found"));
            }

            return Ok(_mapper.Map(Building));
        }

        // PUT: api/Buildings/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        /// <summary>
        /// Update Camapign, only for admins
        /// </summary>
        /// <param name="id"></param>
        /// <param name="Building"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        [Produces("application/json")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(V1DTO.MessageDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(V1DTO.MessageDTO))]
        public async Task<IActionResult> PutBuilding(Guid id, V1DTO.Building Building)
        {
            if (id != Building.Id)
            {
                return BadRequest(new V1DTO.MessageDTO("id and Building.id do not match"));
            }

            await _bll.Buildings.UpdateAsync(_mapper.Map(Building));
            await _bll.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Buildings
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        /// <summary>
        /// Create new Building. only for admins
        /// </summary>
        /// <param name="Building"></param>
        /// <returns></returns>
        [HttpPost]
        [Produces("application/json")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(V1DTO.Building))]
        public async Task<ActionResult<Building>> PostBuilding(V1DTO.Building Building)
        {
            var bllEntity = _mapper.Map(Building);
            _bll.Buildings.Add(bllEntity);
            await _bll.SaveChangesAsync();
            Building.Id = bllEntity.Id;

            return CreatedAtAction("GetBuilding",
                new {id = Building.Id, version = HttpContext.GetRequestedApiVersion()?.ToString() ?? "0"},
                Building);
        }

        // DELETE: api/Buildings/5
        /// <summary>
        /// Delete Building, only for admins
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [Produces("application/json")]
        public async Task<ActionResult<Building>> DeleteBuilding(Guid id)
        {
            var Building= await _bll.Buildings.FirstOrDefaultAsync(id);
            if (Building== null)
            {
                return NotFound(new V1DTO.MessageDTO("Building not found"));
            }

            await _bll.Buildings.RemoveAsync(Building);
            await _bll.SaveChangesAsync();

            return StatusCode(204);
        }
    }
}
